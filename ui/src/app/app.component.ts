import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    viewProviders: [MatIconRegistry]
})
export class AppComponent {
    title = 'Web审查器';
    proxyRules: string[] = [];
    @ViewChild('ruleInput') ruleInput: ElementRef;

    addProxyRule(rule: string) {
        if (rule.length) {
            this.proxyRules.push(rule);
            this.ruleInput.nativeElement.value = '';
        }
    }

    deleteProxyRule(idx: number) {
        setTimeout(() => {
            this.proxyRules.splice(idx, 1);
        }, 0);
    }

    constructor(http: Http, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'close',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/cross.svg')
        );
    }
}
