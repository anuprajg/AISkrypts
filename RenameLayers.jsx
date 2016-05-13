#target Illustrator
var docRef = activeDocument;
 
 
for (var i=0; i < docRef.pageItems.length; i++)
{

var newNum=i+1;      
       {
               docRef.pageItems[i].name = "Path_"+newNum;;
       }
}