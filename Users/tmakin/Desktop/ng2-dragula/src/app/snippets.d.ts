import { DragulaService } from './providers/dragula.provider';
export declare class SnippetExample {
    private dragulaService;
    static SNIPPET_DATA: string[];
    snippets: Snippet[];
    paras: Para[];
    constructor(dragulaService: DragulaService);
    flip(): void;
    reset(): void;
    transformSnippet(snippet: Snippet): Para;
    private buildSnippets();
    private onDropModel(args);
    private onRemoveModel(args);
}
export interface Snippet {
    id: number;
    data: string;
}
export interface Para {
    snippetId: number;
    text: string;
}
