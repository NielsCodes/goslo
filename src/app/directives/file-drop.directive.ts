import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

@Output() fileDropped = new EventEmitter<File>();
@Output() fileHovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
    onDrop($event) {
      // Prevent file opening
      $event.preventDefault();

      const transfer = $event.dataTransfer;
      this.fileDropped.emit(transfer.files[0]);
      this.fileHovered.emit(false);
    }

    @HostListener('dragover', ['$event'])
      onDragOver($event) {
        $event.preventDefault();

        this.fileHovered.emit(true);
      }

    @HostListener('dragleave', ['$event'])
      onDragLeave($event) {
        this.fileHovered.emit(false);
      }

}
