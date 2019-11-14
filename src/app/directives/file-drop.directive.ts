import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

@Output() fileDropped = new EventEmitter<File>();
@Output() fileHovered = new EventEmitter<boolean>();
@Output() fileInvalid  = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
    onDrop($event) {
      // Prevent file opening
      $event.preventDefault();

      const transfer = $event.dataTransfer;

      const file = transfer.files[0];

      if (file.name.endsWith('.mp3') || file.name.endsWith('.wav')) {
        this.fileDropped.emit(transfer.files[0]);
        this.fileInvalid.emit(false);
      } else {
        this.fileInvalid.emit(true);
      }

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
