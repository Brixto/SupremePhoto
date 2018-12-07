import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.page.html',
  styleUrls: ['./swipe.page.scss'],
})
export class SwipePage implements OnInit {

  public imageUrl: SafeUrl = '';
  public isSwipedRight = false;
  public isSwipedLeft = false;

  constructor(private photoLibrary: PhotoLibrary, private domsanitizer: DomSanitizer) {
    // console.log('Swipe Page');
    // this.photoLibrary.requestAuthorization().then(() => {

    //     this.photoLibrary.getLibrary().subscribe(next => {
    //         console.log('aa', next);
    //         next.forEach(libraryItem => {
    //             console.log(libraryItem.id);
    //             console.log(libraryItem.photoURL);
    //             this.imageUrl = domsanitizer.bypassSecurityTrustUrl(libraryItem.photoURL);
    //         });
    //     });
    // });
  }

  ngOnInit() {
  }

  public swipeRight(e) {
    this.isSwipedRight = true;
    this.isSwipedLeft = false;
    console.log('swipe right');
  }

  public swipeLeft() {
    this.isSwipedLeft = true;
    this.isSwipedRight = false;
    console.log('swipe left');
  }
}
