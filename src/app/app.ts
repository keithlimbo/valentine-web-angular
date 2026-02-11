import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
import { sign } from 'crypto';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  yesBtnSize = 'btn-m';
  noClickedTimes = 0;

    titleList = [
    'Hey Love!',
    'Please say YES!!!!',
    'YES is the only option'
  ]

  imageList = [
    '/1.gif',
    '/2.gif',
    '/3.gif'
  ];

  protected isYes = signal(false);
  protected selectedImage = signal(this.imageList[0]);
  protected headerText = signal(this.titleList[0]);
  protected yesClass = signal('btn btn-soft btn-m bg-green-400 rounded-full border-0 py-5');
  protected hideNo = signal(false)
  protected isShaking = signal(false);

  launchConfetti() {
    confetti({
      particleCount: 250,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  triggerShake() {
    this.isShaking.set(true)
    // Remove the class after the animation finishes (400ms) 
    // so it can be re-triggered on the next click.
    setTimeout(() => this.isShaking.set(false), 400);
  }

  onYesClick() {
    this.isYes.set(true);
    this.launchConfetti();
  }

  onNoClick() {
    this.triggerShake();
    this.noClickedTimes++;

    if (this.noClickedTimes === 3) {
      this.yesBtnSize = 'btn-lg';
      this.selectedImage.set(this.imageList[1]);
      this.headerText.set(this.titleList[1]);
    }

    if (this.noClickedTimes === 6) {
      this.yesBtnSize = 'btn-xl';
      this.selectedImage.set(this.imageList[2]);
      this.headerText.set(this.titleList[2]);
      this.hideNo.set(true);
    }

    this.yesClass.set(
        'btn btn-soft ' + this.yesBtnSize + ' bg-green-400 rounded-full border-0 py-5',
      );
  }
}
