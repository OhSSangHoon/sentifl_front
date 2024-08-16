// showdown types 선언 파일

declare module 'showdown' {
    class Converter {
        constructor(options?: ConverterOptions);
        makeHtml(markdown: string): string;
    }
    
    interface ConverterOptions {
        tables?: boolean;
        simplifiedAutoLink?: boolean;
        strikethrough?: boolean;
        tasklists?: boolean;
    }
}