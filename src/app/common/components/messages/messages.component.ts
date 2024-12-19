import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgParticlesModule } from 'ng-particles';
import { Engine, ISourceOptions } from 'tsparticles-engine';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    NgParticlesModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  @Input() type: 'success' | 'warning' | 'error' | 'info' = 'info';
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() gifUrl: string | null = null;
  isVisible: boolean = false;

  particlesOptions: ISourceOptions = {
    particles: {
      number: {
        value: 0,
      },
      size: {
        value: 5,
      },
      move: {
        speed: 10,
        direction: "none",
        outModes: {
          default: "destroy"
        }
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 1
      },
      life: {
        duration: {
          sync: true,
          value: 2
        },
        count: 1
      },
      color: {
        value: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 30
        }
      },
      lineLinked: {
        enable: false
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        resize: true
      }
    },
    detectRetina: true,
    emitters: {
      direction: "none",
      life: {
        count: 1,
        duration: 0.1,
        delay: 0
      },
      rate: {
        delay: 0,
        quantity: 100
      },
      size: {
        width: 0,
        height: 0
      }
    }
  };

  showMessage(type: 'success' | 'warning' | 'error' | 'info', title: string, content: string, gifUrl: string | null = null) {
    this.type = type;
    this.title = title;
    this.content = content;
    this.gifUrl = gifUrl;
    this.isVisible = true;
  }

  closeMessage() {
    this.isVisible = false;
  }
}
