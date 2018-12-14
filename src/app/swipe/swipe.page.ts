import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PhotoLibrary, GetLibraryOptions } from '@ionic-native/photo-library';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Img } from '@ionic/angular';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.page.html',
  styleUrls: ['./swipe.page.scss'],
})
export class SwipePage implements OnInit {

  public list = [];
  public lista = [];
  public finished = '';

  constructor(private photoLibrary: PhotoLibrary, private domsanitizer: DomSanitizer) {
    console.log('Swipe Page');

    let options: GetLibraryOptions =
    {
      thumbnailWidth: 512,
      thumbnailHeight: 384,
      quality: 0.8,
      includeAlbumData: false,
    };

    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary(options).subscribe({
        next: library => {
          library.forEach(libraryItem => {
            let imageUrl = domsanitizer.bypassSecurityTrustUrl(libraryItem.thumbnailURL);
            this.list.push({ url: imageUrl, swipedLeft: false, swipedRight: false });
          });
          console.log('finished');
          this.finished = 'yes';
        },
        error: err => {
          console.log('error loading library');
        },
      });
    });
  }

  ngOnInit() {
  }

  public swipeRight(e) {
    e.swipedRight = true;
  }

  public swipeLeft(e) {
    e.swipedLeft = true;
  }
}
