#target illustrator
myDoc = app.activeDocument;

s = activeDocument.selection;
var firstLevelGroups = []

selSwatches = myDoc.swatches;

getFirstLevelGroups(s, firstLevelGroups);

function getFirstLevelGroups (s, firstLevelGroups)
{
   if (!(s instanceof Array) || s.length < 1) return;
   for(var i = 0; i < s[0].pageItems.length; i++)
    {
        firstLevelGroups.push(s[0].pageItems[i]);
       }
   }
 
 
 for(j=0; j<firstLevelGroups.length; j++)
 {
    var mySelection = [];
    extractPathes(firstLevelGroups[j].pageItems, 1, mySelection);
    swatchIndex = Math.round( Math.random() * (selSwatches.length - 1 ));

for (i=0; i<mySelection.length; i++)
    {
      if(mySelection[i].typename == "PathItem" || mySelection[i].typename == "CompoundPathItem")
      {
        selItem = mySelection[i];
        selItem.filled = true;

        
        
        if(selItem.typename == "PathItem")
          selItem.fillColor = selSwatches[swatchIndex].color;
        else
          selItem.pathItems[0].fillColor = selSwatches[swatchIndex].color;
        
      }
    }

}

function getPathItemsInSelection(n, group, pathes){

  
  var s = group;
  extractPathes(s.pageItems[0], n, pathes);
}


function extractPathes(s, pp_length_limit, pathes){
  for(var i = 0; i < s.length; i++){
    if(s[i].typename == "PathItem"){
      if(pp_length_limit
         && s[i].pathPoints.length <= pp_length_limit){
        continue;
      }
      pathes.push(s[i]);
      
    } else if(s[i].typename == "GroupItem"){
      // search for PathItems in GroupItem, recursively
      extractPathes(s[i].pageItems, pp_length_limit, pathes);
      
    } else if(s[i].typename == "CompoundPathItem"){
      // searches for pathitems in CompoundPathItem, recursively
      // ( ### Grouped PathItems in CompoundPathItem are ignored ### )
      extractPathes(s[i].pathItems, pp_length_limit , pathes);
    }
  }
}