/**
 * Created by tmakin on 21/07/2016.
 */
import { ElementRef } from '@angular/core';
import { DragulaService } from './providers/dragula.provider';
import { DomSanitizationService, SafeHtml } from "@angular/platform-browser";
export declare class CustomHighlight {
    customHighlight: any;
    constructor(el: ElementRef);
}
export declare class SnippetExample {
    private dragulaService;
    private sanitizer;
    static SNIPPET_DATA: string[];
    snippets: Snippet[];
    paras: Para[];
    constructor(dragulaService: DragulaService, sanitizer: DomSanitizationService);
    flip(): void;
    reset(): void;
    transformSnippet(snippet: Snippet): Para;
    private buildSnippets(sanitizer);
    private onDropModel(args);
    private onRemoveModel(args);
}
export interface Snippet {
    id: number;
    data: string;
    dataSafe: SafeHtml;
}
export interface Para {
    snippetId: number;
    text: string;
    textSafe: SafeHtml;
}
