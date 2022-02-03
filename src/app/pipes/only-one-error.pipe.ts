import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'onlyOneError'
})
export class OnlyOneErrorPipe implements PipeTransform {
    transform(allErrros: any, errorPriority: string[]) {
       if (!allErrros) {
        return null;
       }
       const onlyOneError = {};
       for (const error of errorPriority) {
            if (allErrros[error]) {
                onlyOneError[error] = allErrros[error];
                break;
            }
       }
       return onlyOneError;
    }
}