import { Pipe, PipeTransform } from '@angular/core';
import { Options, documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';



@Pipe({
  name: 'toHtml'
})
export class ToHtmlPipe implements PipeTransform {

  transform(value: Document, ...args: unknown[]): string {
    const options: Partial<Options> = {
      renderNode: {
        // Definición de función renderNode
        'embedded-asset-block': (node, next) => {
          // Lógica para manejar el nodo de imagen
          const { url, title, alt } = node.data['target'].fields.file;
          return `<img src="${url}" title="${title}" alt="${alt}" class="blog-content-image" />`;
        },
        'heading-4': (node, next) => {
          // Aplicar estilos CSS personalizados al título H4
          return `<h4 class="blog-content-h4">${next(node.content)}</h4>`;
        },
        'heading-2': (node, next) => {
          // Aplicar estilos CSS personalizados al título H2
          return `<h2 class="blog-content-h2">${next(node.content)}</h2>`;
        },
        'paragraph': (node, next) => {
          // Aplicar estilos CSS personalizados al párrafo
          return `<p class="blog-content-paragraph">${next(node.content)}</p>`;
        },
        'unordered-list': (node, next) => {
          // Aplicar estilos CSS personalizados al título H2
          return `<ul class="blog-content-list">${next(node.content)}</ul>`;
        }
        // Otros nodos personalizados si es necesario
      }

    };

    return documentToHtmlString(value, options);
  }


}
