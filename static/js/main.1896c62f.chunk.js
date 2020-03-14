(this.webpackJsonpimage_handler=this.webpackJsonpimage_handler||[]).push([[0],{116:function(e,t,a){"use strict";a.r(t);var n=a(31),s=a.n(n),l=a(1),r=a.n(l),c=a(74),o=a(32),i=a(21),m=a(22),d=a(24),u=a(23),g=a(25),p=a(38),h=a(129),f=a(130),b=a(131),E=a(132),_=a(133),I=a(148),v=a(134),y=(a(85),[{id:1,href:"#palette",text:"Palette"},{id:2,href:"#filters",text:"Filters"},{id:3,href:"#about",text:"About"}]),O=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={isOpen:!1},a.toggle=a.toggle.bind(Object(p.a)(a)),a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){var e=y.map((function(e){var t=e.id,a=e.href,n=e.text,s=e.className;return r.a.createElement(h.a,{key:t},r.a.createElement(f.a,{href:a,className:s},n))}));return r.a.createElement(b.a,{color:"dark",dark:!0,expand:"md",sticky:"top"},r.a.createElement(E.a,{href:"/"},"Imager"),r.a.createElement(_.a,{onClick:this.toggle}),r.a.createElement(I.a,{isOpen:this.state.isOpen,navbar:!0},r.a.createElement(v.a,{className:"ml-auto",navbar:!0},e)))}}]),t}(l.Component),k=a(28),j=a.n(k),C=a(135),x=a(136),D=a(147),N=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:j.a.mainContainter},r.a.createElement(O,null),r.a.createElement("div",{className:j.a.welcomeContainer},r.a.createElement(C.a,{className:j.a.welcomeContainer},r.a.createElement("h1",{className:j.a.title},"Getting Deeper Understanding"),r.a.createElement("h1",{className:j.a.title},"your Images"),r.a.createElement("p",{className:j.a.subTitle},'This is a place to extract your images\' features and "make up" it. If you want to create your palette, simply go Palette section and upload your image, we will do the rest'),r.a.createElement(x.a,null,r.a.createElement(D.a,{variant:"outline-primary",className:j.a.button,href:"#palette"},"Palette"),r.a.createElement(D.a,{variant:"outline-primary",className:j.a.button,href:"#filters"},"Image Filters")))))}}]),t}(l.Component),S=a(36),w=a.n(S),P=a(39),F=a(20),G=a(149),T=a(138),A=a(48),B=a.n(A),R=function(e){var t=e.selectedID==e.id?"#379683":"#EDF5E1",a=e.title.length,n=a>10?e.title.substring(0,4)+"..."+e.title.substring(a-6,a):e.title;return r.a.createElement(G.a,{raised:!0,onClick:function(){return e.onClick(e.id)},key:e.id,className:B.a.card,style:{backgroundColor:"".concat(t)}},r.a.createElement("img",{src:e.image,alt:"",className:B.a.img}),r.a.createElement(T.a,null,n))},H=a(69),U=a.n(H),L=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.props.Queue.map((function(t){return r.a.createElement(R,{key:t.id,id:t.id,image:t.url,onClick:function(t){return e.props.onClick(t)},title:t.image.name,selectedID:e.props.selectedID})}));return r.a.createElement("div",{className:U.a.CardDeck},t)}}]),t}(l.Component),Q=a(13),Y=a.n(Q),z=a(41),V=a.n(z),K=a(140),q=a(141),J=a(139),W=a(145),Z=a(142),$=a(70),X=a(71),M=["toGray","Gaussian","Detail"],ee=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(d.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={selectedImages:[],task:"toGray",selectedID:-1,loading:!1},a.handleImageChange=function(e){var t=e.target.files[0],n=a.state.selectedImages.length;n+1<=20&&(a.setState((function(e){return{selectedImages:[].concat(Object(F.a)(e.selectedImages),[{id:n,image:t,url:URL.createObjectURL(t),processedImg:{}}]),selectedID:n,loading:!0}})),a.GetPostHandlers(t,a.state.task,n))},a.clickOnImage=function(e){console.log("image",a.state.selectedImages[e]),a.setState({selectedID:e});try{var t=a.state.selectedImages[e];a.state.task in t.processedImg?(console.log(t),a.setState({loading:!1})):(a.setState({loading:!0}),a.GetPostHandlers(a.state.selectedImages[e].image,a.state.task,e))}catch(n){console.log("get error"),a.setState({loading:!0});try{a.GetPostHandlers(a.state.selectedImages[e].image,a.state.task,e)}catch(s){console.log(s)}}},a.GetPostHandlers=function(){var e=Object(P.a)(w.a.mark((function e(t,n,s){var l,r,c,o;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.setState({loading:!0}),l={host:"https://serverimage.herokuapp.com",post:"https://serverimage.herokuapp.com/api/posts/"},r=null,(c=new FormData).append("image",t),c.append("task",n),c.append("image_id",s),o=l.post,V.a.post(o,c,{headers:{"content-type":"multipart/form-data"},timeout:24e4}).then((function(e){r=e.data,console.log(r);var t=r.image_id,n=r.url_result,s=r.task;console.log(s);var c=Object(F.a)(a.state.selectedImages),o=c.findIndex((function(e){return e.id===t}));-1!==o&&(c[o].processedImg[s]=l.host+n,a.setState({selectedImages:Object(F.a)(c),loading:!1}))})).catch((function(e){console.log(e)}));case 9:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),a.filterSelected=function(e){console.log("Filter id",M[e]),console.log("image selected",a.state.selectedID),a.setState({task:M[e]});try{var t=a.state.selectedImages[a.state.selectedID];M[e]in t.processedImg?(console.log(t),a.setState({loading:!1})):(a.setState({loading:!0}),a.GetPostHandlers(a.state.selectedImages[a.state.selectedID].image,M[e],a.state.selectedID))}catch(n){console.log("get error"),a.setState({loading:!0});try{a.GetPostHandlers(a.state.selectedImages[a.state.selectedID].image,M[e],a.state.selectedID)}catch(s){console.log(s)}}},a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state.selectedImages[this.state.selectedID],a=null,n=this.state.loading?r.a.createElement(J.a,{color:"secondary"}):null;if(t){a=r.a.createElement(K.a,{className:Y.a.retunedImg},r.a.createElement(q.a,{src:t.url,alt:"Before"}),r.a.createElement(T.a,{disabled:!0}," Before "));var s=t.processedImg[this.state.task];s&&!this.state.loading&&(n=r.a.createElement(K.a,{className:Y.a.retunedImg},r.a.createElement(q.a,{src:s,alt:"After"}),r.a.createElement(T.a,{disabled:!0}," After ")))}var l=["To Gray","Gaussian Blur","Detail Enhance"].map((function(t,a){return r.a.createElement(W.a,{color:"secondary",variant:"contained",onClick:function(){return e.filterSelected(a)},key:a,style:{margin:"1em"}},t)}));return r.a.createElement("div",{className:Y.a.container},r.a.createElement(O,null),r.a.createElement(C.a,{fluid:!0,className:Y.a.jumbotron},r.a.createElement("h1",{className:Y.a.title},"Filters"),r.a.createElement("p",{className:Y.a.subTitle},"The place to make up your images"),r.a.createElement("p",null," You can upload up to 20 images")),r.a.createElement("div",{className:Y.a.root},r.a.createElement(Z.a,{container:!0,spacing:0},r.a.createElement(Z.a,{item:!0,className:Y.a.choosingImage,xs:12},r.a.createElement("input",{accept:"image/*",className:Y.a.input,id:"contained-button-file",onChange:this.handleImageChange,required:!0,type:"file",style:{display:"none"}}),r.a.createElement("label",{htmlFor:"contained-button-file"},r.a.createElement(W.a,{variant:"contained",color:"primary",component:"span"},"Select an image"))),r.a.createElement(Z.a,{item:!0,xs:1,md:4}),r.a.createElement(Z.a,{item:!0,xs:10,md:4},r.a.createElement(L,{Queue:this.state.selectedImages,onClick:this.clickOnImage,selectedID:-1===this.state.selectedID?0:this.state.selectedID})),r.a.createElement(Z.a,{item:!0,xs:1,md:4})),0===this.state.selectedImages.length?null:r.a.createElement(Z.a,{container:!0,spacing:0},r.a.createElement(Z.a,{item:!0,className:Y.a.choosingImage,xs:12}),r.a.createElement(Z.a,{item:!0,xs:4,className:Y.a.temp},a),r.a.createElement(Z.a,{item:!0,xs:1,className:Y.a.temp}," ",r.a.createElement($.a,null)," "),r.a.createElement(Z.a,{item:!0,xs:2,className:Y.a.temp}," ",l," "),r.a.createElement(Z.a,{item:!0,xs:1,className:Y.a.temp}," ",r.a.createElement(X.a,null)," "),r.a.createElement(Z.a,{item:!0,xs:4,className:Y.a.temp},this.state.task,n))))}}]),t}(l.Component),te=a(144),ae=a(45),ne=a.n(ae),se=function(e){var t=e.colors?e.colors.map((function(e,t){var a=function(e){return"#"+e.map((function(e){var t=e.toString(16);return 1===t.length?"0"+t:t})).join("")}(e);return r.a.createElement("div",{key:t,className:ne.a.card},r.a.createElement(te.a,{boxShadow:3,bgcolor:a,className:ne.a.Button}),t+1,". ",a)})):[];return r.a.createElement("div",{className:ne.a.container},t)},le=a(29),re=a.n(le),ce=a(11),oe=a(146),ie=Object(ce.a)({root:{color:"#52af77",height:8},thumb:{height:24,width:24,backgroundColor:"#fff",border:"2px solid currentColor",marginTop:-8,marginLeft:-12,"&:focus,&:hover,&$active":{boxShadow:"inherit"}},active:{},valueLabel:{left:"calc(-50% + 4px)"},track:{height:8,borderRadius:4},rail:{height:8,borderRadius:4}})(oe.a),me=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(d.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={selectedImages:[],currentResult:[],numberOfColors:4,selectedID:-1,loading:!1},a.handleImageChange=function(e){var t=e.target.files[0],n=a.state.selectedImages.length;n+1<=20&&(a.setState((function(e){return{selectedImages:[].concat(Object(F.a)(e.selectedImages),[{id:n,image:t,url:URL.createObjectURL(t),palette:[],isProcessed:!1}]),selectedID:n}})),a.GetPostHandlers(t,"palette",n))},a.clickOnImage=function(e){a.setState({selectedID:e,loading:!0}),a.state.selectedImages[e].palette&&a.state.selectedImages[e].palette.length&&a.state.selectedImages[e].isProcessed?a.setState({currentResult:a.state.selectedImages[e].palette,loading:!1}):a.GetPostHandlers(a.state.selectedImages[e].image,"palette",e)},a.GetPostHandlers=function(){var e=Object(P.a)(w.a.mark((function e(t,n,s){var l,r,c,o;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.setState({loading:!0}),console.log("number of colors",a.state.numberOfColors),l={host:"https://serverimage.herokuapp.com",post:"https://serverimage.herokuapp.com/api/posts/"},r=null,(c=new FormData).append("image",t),c.append("task",n),c.append("numberOfColors",a.state.numberOfColors),c.append("image_id",s),o=l.post,V.a.post(o,c,{headers:{"content-type":"multipart/form-data"}}).then((function(e){r=e.data;var t=Object(F.a)(a.state.selectedImages),n=t.findIndex((function(e){return e.id===s}));if(-1!==n&&(t[n].palette=r,t[n].isProcessed=!1,a.setState({selectedImages:Object(F.a)(t)})),console.log(e.data),e.data.numberOfColor===a.state.numberOfColors){var l=e.data.palette;console.log(l),a.setState({currentResult:l,loading:!1})}})).catch((function(e){console.log(e)}));case 11:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),a.sliderChanged=function(e,t){console.log(t),a.setState({numberOfColors:t});var n=Object(F.a)(a.state.selectedImages);if(0!==n.length){a.setState({loading:!0}),n.forEach((function(e){e.isProcessed=!1})),a.setState({selectedImages:Object(F.a)(n)});var s=a.state.selectedID;a.clickOnImage(s)}},a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=Object(F.a)(this.state.currentResult).splice(0,this.state.numberOfColors),a=this.state.loading?r.a.createElement(J.a,{color:"secondary"}):r.a.createElement(se,{colors:t}),n=this.state.selectedID>=0?r.a.createElement("img",{src:this.state.selectedImages[this.state.selectedID].url,alt:"",style:{width:"100%",height:"auto"}}):null;return r.a.createElement("div",{className:re.a.container},r.a.createElement(O,null),r.a.createElement(C.a,{fluid:!0,className:re.a.jumbotron},r.a.createElement("h1",{className:re.a.title},"Palette"),r.a.createElement("p",{className:re.a.subTitle},"The place to get colors from your images"),r.a.createElement("p",null," You can upload up to 20 images")),r.a.createElement("div",{className:re.a.root},r.a.createElement(Z.a,{container:!0,spacing:0},r.a.createElement(Z.a,{item:!0,className:re.a.choosingImage,xs:12},r.a.createElement(ie,{step:1,valueLabelDisplay:"on",min:2,max:9,"aria-label":"pretto slider",onChange:function(t,a){e.setState({numberOfColors:a})},onChangeCommitted:this.sliderChanged,defaultValue:4,style:{width:"30%"}}),r.a.createElement("div",{style:{margin:"1em"}},"The number of dominant colors: ",this.state.numberOfColors),r.a.createElement("div",null,r.a.createElement("input",{accept:"image/*",className:re.a.input,id:"contained-button-file",onChange:this.handleImageChange,required:!0,type:"file",style:{display:"none"}}),r.a.createElement("label",{htmlFor:"contained-button-file"},r.a.createElement(W.a,{variant:"contained",color:"primary",component:"span"},"Select an image")))),r.a.createElement(Z.a,{item:!0,xs:1,md:4}),r.a.createElement(Z.a,{item:!0,xs:10,md:4},r.a.createElement(L,{Queue:this.state.selectedImages,onClick:this.clickOnImage,selectedID:-1==this.state.selectedID?0:this.state.selectedID})),r.a.createElement(Z.a,{item:!0,xs:1,md:4}),r.a.createElement(Z.a,{item:!0,xs:1}),r.a.createElement(Z.a,{item:!0,xs:5,className:re.a.retunedImg},n),r.a.createElement(Z.a,{item:!0,xs:1}),r.a.createElement(Z.a,{item:!0,xs:3},"  ",a),r.a.createElement(Z.a,{item:!0,xs:1}))))}}]),t}(l.Component),de=r.a.createElement(c.a,{basename:"/FinalProject"},r.a.createElement(o.a,{render:function(e){e.location;return r.a.createElement(o.c,null,r.a.createElement(o.a,{exact:!0,path:"/",component:N}),r.a.createElement(o.a,{exact:!0,path:"/filters",component:ee}),r.a.createElement(o.a,{exact:!0,path:"/palette",component:me}))}}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(de,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},13:function(e,t,a){e.exports={jumbotron:"Filter_jumbotron__FrzV8",container:"Filter_container__2cjjo",title:"Filter_title__1zxmv",subTitle:"Filter_subTitle__a7iEV",body:"Filter_body__aU3-S",choosingImage:"Filter_choosingImage__1APFj",retunedImg:"Filter_retunedImg__2bVJ2",selected:"Filter_selected__3UjGP",notSelected:"Filter_notSelected__o5w-f",root:"Filter_root__17rUu",temp:"Filter_temp__3tSkZ"}},28:function(e,t,a){e.exports={welcomeContainer:"main_welcomeContainer__136zs",title:"main_title__iQY6v",subTitle:"main_subTitle__1UFGT",mainContainter:"main_mainContainter__2Ymzm",navBar:"main_navBar__3D_K9",button:"main_button__2hPXZ"}},29:function(e,t,a){e.exports={jumbotron:"palette_jumbotron__PY2SA",container:"palette_container__1KSoE",title:"palette_title__1PAw9",subTitle:"palette_subTitle__3hGAq",choosingImage:"palette_choosingImage__1YRHk",retunedImg:"palette_retunedImg__14fKf",root:"palette_root__3N_WV"}},45:function(e,t,a){e.exports={card:"PaletteDisplay_card__35j2A",container:"PaletteDisplay_container__2-n2e",Button:"PaletteDisplay_Button__YQEG3"}},48:function(e,t,a){e.exports={card:"Image_card__2797j",img:"Image_img__1BzDD"}},69:function(e,t,a){e.exports={CardDeck:"ImgQueue_CardDeck__3AjKQ"}},80:function(e,t,a){e.exports=a(116)}},[[80,1,2]]]);
//# sourceMappingURL=main.1896c62f.chunk.js.map