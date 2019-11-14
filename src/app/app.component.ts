import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as Tone from 'tone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef) {}

  buffer;
  player;

  file: File;
  dropzoneHover = false;
  dropzoneActive = true;
  dropzoneInvalid = false;

  // Control variables
  trackName: string;
  isPlaying = true;

  ngOnInit() {  }

  handleDrop(file: File) {
    this.file = file;
    this.playAudio();
  }

  dropzoneState($event: boolean) {
    this.dropzoneHover = $event;
  }

  dropzoneFileState($event: boolean) {
    this.dropzoneInvalid = $event;
  }

  onDropzoneClick() {

    if (!this.dropzoneActive) {
      this.dropzoneActive = true;
    } else {
      this.openFileSelector();
    }

  }

  openFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.type = 'file';
    fileSelector.accept = 'audio/mpeg, audio/wave';

    // Set selectedfile to first chosen file from file selector
    fileSelector.onchange = () => {
      this.dropzoneInvalid = false;
      const file = fileSelector.files[0];
      this.file = file;
      this.playAudio();
    };

    fileSelector.click();
  }

  setTrackName(name: string) {
    this.trackName = name.substring(0, name.length - 4); // remove file extension form name
  }

  toggleAudio() {
    if (this.isPlaying) {
      // console.log(this.player.buffer)
      this.player.stop();
      this.isPlaying = false;
    } else {
      this.player.start();
      this.isPlaying = true;
    }
  }

  playAudio() {

    this.setTrackName(this.file.name);
    this.dropzoneActive = false;

    // If a player instance already exists, it is disposed.
    if (this.player) {
      this.player.dispose();
    }

    // const selectedFile = (document.getElementById('audio-input') as HTMLInputElement).files[0];
    const reader = new FileReader();
    const audioContext = new AudioContext();

    reader.onloadend = () => {
      const buffer = reader.result as ArrayBuffer;
      audioContext.decodeAudioData(buffer, (audioBuffer: AudioBuffer) => {
        this.player = new Tone.Player(audioBuffer).toMaster();
        this.player.playbackRate = 0.8;
        this.player.start();
        this.isPlaying = true;
        this.ref.detectChanges();
        console.log(this.isPlaying);
      });
    };

    reader.readAsArrayBuffer(this.file);

  }

}
