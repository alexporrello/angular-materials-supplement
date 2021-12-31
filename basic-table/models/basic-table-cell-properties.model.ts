import { EventEmitter } from '@angular/core';
import { AnimatedIcon } from '@animated/animated-icon/animated-icon.component';

import { TextAlign } from '../enums/text-align.enum';
import { ConditionalIcon } from './basic-table-conditional-icon.model';

export class CellProperties {
    constructor(
        public hide = false,
        public hideText = false,
        public colspan = 1,
        public textAlign = TextAlign.left,
        public fontWeight = 400,
        public minWidth: string | number = '',
        public width: string | number = '',
        public marquee = false,
        public bgColor = '',
        public color = '',
        public icon = '',
        public iconColor = '',
        public cursorType = '',
        public borderRight = true,
        public clickEvent = new EventEmitter(),
        public conditionalIcon?: {
            conditionField: string,
            condTrue: ConditionalIcon,
            condFalse: ConditionalIcon
        },
        public animatedIcon?: {
            conditionField?: string,
            icon: AnimatedIcon,
            state?: boolean,
            primaryColor?: string,
            secondaryColor?: string,
        }
    ) { }
}
