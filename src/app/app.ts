import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
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
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3RueWQwOHM4aGczOTFpbzJnZG8wM3Q1ZHFjdHl4M2c3a25weWJudCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uKvAWApE3vWL1MAASf/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXpudG9qYmhkdHQ0Mmp3OWtiNGgxczVuaWVoMW05b2I4ejA1OTJtdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zZbf6UpZslp3nvFjIR/giphy.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWt6dW9rZjRnb3k2Z3h4NnYzbGZvMTBieTgzMzdkanFrd2ZsNGl4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vPzbDN4rBxuvtpSpzF/giphy.gif'
  ];

  protected isYes = signal(false);
  protected selectedImage = signal(this.imageList[0]);
  protected headerText = signal(this.titleList[0]);
  protected yesClass = signal('btn btn-soft btn-m bg-green-400 rounded-full border-0 py-5');
  protected hideNo = signal(false)

  launchConfetti() {
    confetti({
      particleCount: 250,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  onYesClick() {
    this.isYes.set(true);
    this.launchConfetti();
  }

  onNoClick() {
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
