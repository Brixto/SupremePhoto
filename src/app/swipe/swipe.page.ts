import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { StackConfig, Direction, SwingStackDirective, SwingCardDirective, ThrowEvent } from "ionic-swing";
import { QueryList, AfterViewInit } from "@angular/core";

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.page.html',
  styleUrls: ['./swipe.page.scss'],
})
export class SwipePage implements OnInit, AfterViewInit {

  @ViewChild('swingStack', { read: SwingStackDirective }) swingStack: SwingStackDirective;
  @ViewChildren('swingCards', { read: SwingCardDirective }) swingCards: QueryList<SwingCardDirective>;

  public imageUrl: SafeUrl = '';

  stackConfig: StackConfig;

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

    this.stackConfig = {
      // Default setting only allows UP, LEFT and RIGHT so you can override this as below
      allowedDirections: [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT],
      // Now need to send offsetX and offsetY with element instead of just offset
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 1.7), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngOnInit() {
  }

  public swipeRight(e) {
    console.log('swipe right');
  }

  public swipeLeft() {
    console.log('swipe left');
  }

  ngAfterViewInit() {
    // ViewChild & ViewChildren are only available
    // in this function

    console.log(this.swingStack); // this is the stack
    console.log(this.swingCards); // this is a list of cards

    // we can get the underlying stack
    // which has methods - createCard, destroyCard, getCard etc
    console.log(this.swingStack.stack);

    // and the cards
    // every card has methods - destroy, throwIn, throwOut etc
    this.swingCards.forEach((c) => console.log(c.getCard()));

    // this is how you can manually hook up to the
    // events instead of providing the event method in the template
    this.swingStack.throwoutleft.subscribe(
      (event: ThrowEvent) => console.log('Manual hook: ', event));

    this.swingStack.dragstart.subscribe((event: DragEvent) => console.log(event));

    this.swingStack.dragmove.subscribe((event: DragEvent) => console.log(event));
  }

}
