/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';

@injectable()
export class CoffeescriptContribution implements LanguageGrammarDefinitionContribution {

    readonly id = 'coffeescript';
    readonly scopeName = 'source.coffee';

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: this.id,
            extensions: ['.coffee', '.litcoffee'],
            aliases: ['Coffeescript', 'coffeescript']
        });
        monaco.languages.setLanguageConfiguration(this.id, {
            comments: {
                lineComment: '#',
                blockComment: ['###', '###']
            },
            brackets: [
                ['{', '}'],
                ['[', ']'],
                ['(', ')']
            ],
            autoClosingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"' },
                { open: '\'', close: '\'' }
            ],
            surroundingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"' },
                { open: '\'', close: '\'' }
            ],
            folding: {
                offSide: true,
                markers: {
                    start: new RegExp('^\\s*#region\\b'),
                    end: new RegExp('^\\s*#endregion\\b')
                }
            }
        });
        const grammar = require('../../data/coffeescript.tmLanguage.json');
        registry.registerTextmateGrammarScope(this.scopeName, {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: grammar
                };
            }
        });
        registry.mapLanguageIdToTextmateGrammar(this.id, this.scopeName);
    }
}
