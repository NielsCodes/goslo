import { Component, OnInit } from '@angular/core';

import * as Tone from 'tone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  buffer;
  player;

  selectedFile: File;
  dropzoneActive = false;

  dropText = 'Drop your track here';
  trackName: string;

  ngOnInit() {  }

  handleDrop(file: File) {
    this.selectedFile = file;
    this.useAudio();
    this.dropText = file.name;
    this.trackName = file.name;
  }

  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  useAudio() {

    this.player = null;

    // const selectedFile = (document.getElementById('audio-input') as HTMLInputElement).files[0];
    const reader = new FileReader();
    const audioContext = new AudioContext();

    reader.onloadend = () => {
      const buffer = reader.result as ArrayBuffer;
      audioContext.decodeAudioData(buffer, (audioBuffer: AudioBuffer) => {
        this.player = new Tone.Player(audioBuffer).toMaster();
        this.player.playbackRate = 0.8;
        this.player.start();
      });
    };

    reader.readAsArrayBuffer(this.selectedFile);

  }

}
