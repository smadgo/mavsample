/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Lightning, Utils } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
    static getFonts() {
        return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
    }

    static _template() {
        return {
            Background: {
                w: 1920,
                h: 1080,
                color: 0xfffbb03b,
                src: Utils.asset('images/background.png'),
            },
            Main: {
                Logo: {
                    w: 200, h: 50,
                    src: Utils.asset('images/logo-inner.png'),
                },
                SigninOptions: {
                    x: 1500,
                    flex: {direction: 'column', wrap: true},
                    Login: {
                        type: Button,
                        label: "Login",
                        flexItem: {margin: 10},
                        focusColor: true
                    },
                    Signin: {
                        type: Button,
                        label: "Sign in",
                        flexItem: {margin: 10},
                        focusColor: false
                    }
                },
                Text: {
                    mount: 0.5,
                    x: 960,
                    y: 540,
                    text: {
                        text: "Loading...",
                        fontFace: 'Regular',
                        fontSize: 64,
                        textColor: 0xbbffffff,
                    },
                },
            },
            ComingSoon: {
                mount: 0.5,
                x: 960,
                y: 540,
                alpha:0,
                text: {
                    text: "Loading...",
                    fontFace: 'Regular',
                    fontSize: 64,
                    textColor: 0xbbffffff,
                },
            },
        }
    }

    _init() {
        this._selectedItem = "Login"
        this.tag('Background')
            .animation({
                duration: 15,
                repeat: -1,
                actions: [
                    {
                        t: '',
                        p: 'color',
                        v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff46730 }, 0.8: { v: 0xfffbb03b } },
                    },
                ],
            })
            .start()
    }

    _handleLeft(){
        this._selectedItem = "Login"
        this.tag('Login').focusColor = true
        this.tag('Signin').focusColor = false
    }

    _handleRight(){
        this._selectedItem = "Sign in"
        this.tag('Login').focusColor = false
        this.tag('Signin').focusColor = true
    }
    _handleEnter(){
        this.tag("ComingSoon").text.text = `${this._selectedItem} coming soon...`
        this.tag("ComingSoon").setSmooth('alpha', 1, {duration:0.5})
        this.tag("Text").setSmooth('alpha', 0, {duration:0.5})
        this.tag("Main").setSmooth('alpha', 0, {duration:0.5})

        setTimeout(()=>{
            this.tag("ComingSoon").setSmooth('alpha', 0, {duration:0.5})
            this.tag("Text").setSmooth('alpha', 1, {duration:0.5})
            this.tag("Main").setSmooth('alpha', 1, {duration:0.5})
        }, 2000)
    }
}

class Button extends Lightning.Component{
    static _template(){
        return {
            w:200, h:60,
            Background: {
                rect: true, w:w=>w, h: h=>h, color: 0xFFFF0041,
            },
            Label:{
                x:100,y:30, mount:0.5,
                text: {
                    fontFace: 'Regular',
                    fontSize: 20,
                    fontStyle:'bold',
                    textColor: 0xFFF1F1F1,
                }
            }
        }
    }

    set label(textValue){
        this.tag("Label").text = textValue
    }

    set focusColor(isInFocus){
        this.tag("Background").color = isInFocus ? 0xFFFF0041 : 0xFFF1F1F1
        this.tag("Label").text.textColor = isInFocus ? 0xFFF1F1F1 : 0xFFFF0041
    }
}

