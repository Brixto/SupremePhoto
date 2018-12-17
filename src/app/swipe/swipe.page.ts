import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PhotoLibrary, GetLibraryOptions } from '@ionic-native/photo-library';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Img } from '@ionic/angular';

@Component({
    selector: 'app-swipe',
    templateUrl: './swipe.page.html',
    styleUrls: ['./swipe.page.scss'],
})
export class SwipePage {

    public list: any[] = [];

    constructor(
        private photoLibrary: PhotoLibrary,
        private domsanitizer: DomSanitizer) {
    }

    public logs() {
        console.log('log this please');

        this.photoLibrary.requestAuthorization().then(() => {
            this.photoLibrary.getLibrary().subscribe({
                next: library => {
                    library.forEach(libraryItem => {
                        const imageUrl = this.domsanitizer.bypassSecurityTrustStyle(`url(${libraryItem.photoURL})`);
                        this.list.push({ url: imageUrl, swipedLeft: false, swipedRight: false });
                    });
                    console.log('finished');
                },
                error: err => {
                    console.log('error loading library');
                },
            });
        });
    }

    public swipeRight(e) {
        e.swipedRight = true;
    }

    public swipeLeft(e) {
        e.swipedLeft = true;
    }
}
