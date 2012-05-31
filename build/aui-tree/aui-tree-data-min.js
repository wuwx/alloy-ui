AUI.add("aui-tree-data",function(m){var h=m.Lang,l=h.isArray,k=h.isObject,c=h.isUndefined,v="boundingBox",f="children",n="container",p=".",i="id",t="index",s="nextSibling",x="node",d="ownerTree",g="parentNode",q="prevSibling",o="previousSibling",r="tree",b="tree-data",j=function(y){return(y instanceof m.TreeNode);},e=function(y){return(y instanceof m.TreeView);},u=m.ClassNameManager.getClassName,a=u(r,x);var w=m.Component.create({NAME:b,ATTRS:{container:{setter:m.one},children:{value:[],validator:l,setter:"_setChildren"},index:{value:{}}},prototype:{UI_EVENTS:{},initializer:function(){var y=this;y.publish("move");y.publish("append",{defaultFn:y._appendChild});y.publish("remove",{defaultFn:y._removeChild});},destructor:function(){var y=this;y.eachChildren(function(z){z.destroy();},true);},getNodeById:function(z){var y=this;return y.get(t)[z];},isRegistered:function(z){var y=this;return !!(y.get(t)[z.get(i)]);},updateReferences:function(B,C,F){var G=this;var E=B.get(g);var y=B.get(d);var D=E&&(E!==C);if(E){if(D){var z=E.get(f);m.Array.removeItem(z,G);E.set(f,z);}E.unregisterNode(B);}if(y){y.unregisterNode(B);}B.set(g,C);B.set(d,F);if(C){C.registerNode(B);}if(F){F.registerNode(B);}if(y!==F){B.eachChildren(function(H){G.updateReferences(H,H.get(g),F);});}if(D){var A=G.getEventOutputMap(B);if(!E.get("children").length){E.collapse();E.hideHitArea();}A.tree.oldParent=E;A.tree.oldOwnerTree=y;G.bubbleEvent("move",A);}},refreshIndex:function(){var y=this;y.updateIndex({});y.eachChildren(function(z){y.registerNode(z);},true);},registerNode:function(B){var y=this;var A=B.get(i);var z=y.get(t);if(A){z[A]=B;}if(e(y)){B.addTarget(y);}B._inheritOwnerTreeAttrs();y.updateIndex(z);},updateIndex:function(z){var y=this;if(z){y.set(t,z);}},unregisterNode:function(A){var y=this;var z=y.get(t);delete z[A.get(i)];if(e(y)){A.removeTarget(y);}y.updateIndex(z);},collapseAll:function(){var y=this;y.eachChildren(function(z){z.collapse();},true);y.fire("collapseAll",y.getEventOutputMap(y));},expandAll:function(){var y=this;y.eachChildren(function(z){z.expand();},true);y.fire("expandAll",y.getEventOutputMap(y));},selectAll:function(){var y=this;y.eachChildren(function(z){z.select();},true);},unselectAll:function(){var y=this;y.eachChildren(function(z){z.unselect();},true);},eachChildren:function(B,z){var y=this;var A=y.getChildren(z);m.Array.each(A,function(C){if(C){B.apply(y,arguments);}});},eachParent:function(A){var z=this;var y=z.get(g);while(y){if(y){A.apply(z,[y]);}y=y.get(g);}},bubbleEvent:function(C,B,D,A){var z=this;z.fire(C,B);if(!D){var y=z.get(g);B=B||{};if(c(A)){A=true;}B.stopActionPropagation=A;while(y){y.fire(C,B);y=y.get(g);}}},createNode:function(z){var y=this;var A=m.TreeNode.nodeTypes[k(z)?z.type:z]||m.TreeNode;return new A(k(z)?z:{});},appendChild:function(B,A){var y=this;var z=y.getEventOutputMap(B);y.bubbleEvent("append",z,A);},_appendChild:function(F){if(F.stopActionPropagation){return false;}var y=this;var E=F.tree.node;var z=y.get(d);var C=y.get(f);y.updateReferences(E,y,z);var D=C.push(E);y.set(f,C);var B=D-2;var A=y.item(B);E.set(s,null);E.set(q,A);y.get(n).append(E.get(v));E.render();},item:function(z){var y=this;return y.get(f)[z];},indexOf:function(z){var y=this;return m.Array.indexOf(y.get(f),z);},hasChildNodes:function(){return(this.get(f).length>0);},getChildren:function(z){var y=this;var B=[];var A=y.get(f);B=B.concat(A);if(z){y.eachChildren(function(C){B=B.concat(C.getChildren(z));});}return B;},getEventOutputMap:function(z){var y=this;return{tree:{instance:y,node:z||y}};},removeChild:function(A){var y=this;var z=y.getEventOutputMap(A);y.bubbleEvent("remove",z);},_removeChild:function(C){if(C.stopActionPropagation){return false;}var y=this;var B=C.tree.node;var z=y.get(d);if(y.isRegistered(B)){B.set(g,null);y.unregisterNode(B);B.set(d,null);if(z){z.unregisterNode(B);}B.get(v).remove();var A=y.get(f);m.Array.removeItem(A,B);y.set(f,A);}},empty:function(){var y=this;y.eachChildren(function(A){var z=A.get(g);if(z){z.removeChild(A);}});},insert:function(F,C,D){var I=this;C=C||this;if(C===F){return false;}var y=C.get(g);if(F&&y){var E=F.get(v);var B=C.get(v);var H=C.get(d);if(D==="before"){B.placeBefore(E);}else{if(D==="after"){B.placeAfter(E);}}var z=[];var G=y.get(v).all("> ul > li");G.each(function(J){z.push(m.Widget.getByNode(J));});F.set(s,m.Widget.getByNode(E.get(s)));F.set(q,m.Widget.getByNode(E.get(o)));C.updateReferences(F,y,H);y.set(f,z);}F.render();var A=C.getEventOutputMap(F);A.tree.refTreeNode=C;C.bubbleEvent("insert",A);},insertAfter:function(z,y){y.insert(z,y,"after");},insertBefore:function(z,y){y.insert(z,y,"before");},getNodeByChild:function(A){var y=this;var z=A.ancestor(p+a);if(z){return y.getNodeById(z.attr(i));}return null;},_inheritOwnerTreeAttrs:h.emptyFn,_setChildren:function(z){var y=this;var A=[];m.Array.each(z,function(B){if(B){if(!j(B)&&k(B)){B=y.createNode(B);}if(!j(y)){B.set(d,y);}else{B.set(d,y.get(d));}B._inheritOwnerTreeAttrs();B.render();if(m.Array.indexOf(A,B)===-1){A.push(B);}}});return A;}}});m.TreeData=w;},"@VERSION@",{skinnable:false,requires:["aui-base"]});