/**
 * Created by tmakin on 21/07/2016.
 */
import {Component,Directive, ElementRef, Input} from '@angular/core';
import {Dragula} from './directives/dragula.directive';
import {DragulaService} from './providers/dragula.provider';
import {DomSanitizationService, SafeHtml} from "@angular/platform-browser";

@Directive({ selector: '[customHighlight]' })
export class CustomHighlight {
    @Input() customHighlight:any;

    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }
}

@Component({
    selector: 'repeat-example',
    directives: [Dragula, CustomHighlight],
    viewProviders: [DragulaService],
    template:`
  <div class='parent'>
    <label for='hy'>One way drag from left to right.
    <code>Snippet</code> models are transformed into <code>Paragraph</code> models 
    on drop using the <code>[dragulaModelTransform]</code> attribute</label>
    
    <div class='wrapper'>
    
      <div class="container">
        <div class="title" [customHighlight]>Snippets <button (click)="flip()">Flip</button></div>
      </div>
      
      <div class="container">
        <div class="title">Paragraphs <button (click)="reset()">Clear</button></div>
      </div>
      
    </div>
    
    <div class='wrapper'>  
      <div class='container' 
      [dragula]='"snippets"' 
      [dragulaModel]='snippets'
      [dragulaModelTransform]='transformSnippet'
      id="snippets">
       <!-- Make sure you don't put any other elements in here or the model sync will get confused -->
        <div *ngFor='let snippet of snippets'><div class="handle" [innerHtml]="snippet.dataSafe"></div></div>
      </div>
      
   
      <div class='container' [dragula]='"snippets"' [dragulaModel]='paras' id="document">
        <div *ngFor='let para of paras'>
        <div class="handle">Parent Snippet: {{para.snippetId}}</div>
        <div [innerHtml]="para?.textSafe"></div>
        </div>
      </div>
    </div>
    <div class='wrapper'>
      <div class='container'><pre>{{snippets | json}}</pre></div>
      <div class='container'><pre>{{paras | json}}</pre></div>
    </div>
  </div>
  `
})

export class SnippetExample {

    //the prensence of <custom-component> will cause angular sanitizer warnings
    static SNIPPET_DATA:string[] = [
        "dolor elit, <span [customHighlight]>pellentesque</span> a, facilisis non, bibendum sed, est. Nunc laoreet lectus quis",
        "ornare. In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam",
        "dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor",
        "quis accumsan convallis, ante lectus convallis est, vitae sodales nisi magna sed dui. Fusce aliquam, enim nec",
        "Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non",
        "in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus ornare. Fusce mollis. Duis sit",
        "neque. In ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et",
        "varius et, euismod et, commodo at, libero. Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate",
        "nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum",
        "commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus",
        "scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut",
        "euismod enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec",
    ];


    public snippets: Snippet[] = [];
    public paras: Para[] = [];


    constructor(private dragulaService: DragulaService, private sanitizer: DomSanitizationService) {
        dragulaService.dropModel.subscribe((value: any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value: any) => {
            this.onRemoveModel(value.slice(1));
        });

        dragulaService.setOptions('snippets', {
            isContainer: function (el:any) {
                return false; // only elements in drake.containers will be taken into account
            },
            moves: function (el:Element, source:Element, handle:any, sibling:any) {
                //NB: classList not supported on IE <= 9
                return source.id === "snippets" || handle.classList.contains('handle');
            },
            accepts: function (el:Element, target:Element, source:any, sibling:any) {
                return target.id !== "snippets";
            },
            copy: function (el:Element, source:Element) {
                return source.id === "snippets";
            },

            direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
            copySortSource: false,             // elements in copy-source containers can be reordered
            revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
            removeOnSpill: true,               // spilling will `.remove` the element, if this is true
            mirrorContainer: document.body,    // set the element that gets mirror elements appended
            ignoreInputTextSelection: true     // allows users to select input text, see details below
        });

        this.snippets = this.buildSnippets(this.sanitizer);
        this.paras = [];

    }

    public flip() {
        this.snippets.reverse();
    }

    public reset() {
        this.paras = [];
    }

    public transformSnippet(snippet:Snippet):Para {

        console.log("transform func", snippet);
        return {
            snippetId: snippet.id,
            text: snippet.data,
            textSafe: snippet.dataSafe
        };
    }

    private buildSnippets(sanitizer:DomSanitizationService) {

        let snippets:any[] = [];

        SnippetExample.SNIPPET_DATA.forEach(function(value, index) {
            var data = `<div>${value}</div>`;
            snippets.push({
                id:index+1,
                data: data,
                dataSafe: sanitizer.bypassSecurityTrustHtml(data)
            });
        });

        return snippets;
    }


    private onDropModel(args: any) {
        let [el, target, source] = args;
        //console.log('onDropModel:');
        //console.log(el);
        //console.log(target);
        //console.log(source);

        return false;
    }

    private onRemoveModel(args: any) {
        let [el, source] = args;
        //console.log('onRemoveModel:');
        //console.log(el);
        //console.log(source);
    }
}

export interface Snippet {
    id:number;
    data:string;
    dataSafe: SafeHtml;
}

export interface Para {
    snippetId:number;
    text:string;
    textSafe: SafeHtml;
}
