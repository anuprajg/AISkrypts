String.prototype.trim = function () {  
    return this.replace(/^\s+/,'').replace(/\s+$/,'');  
} 

try   {
    if  (app.documents.length  >  0)  {    
        var  destFolder  =  null;    
        destFolder  =  Folder.selectDialog( 'Select folder for CSV output.',  '~' );    
        var alphanumeric = RegExp(/^\w+$/);

        if  (destFolder  !=  null)  {  
            var  doc  =  activeDocument;    
            var  col  =  doc.swatches;    
            var  validColors  =  new  Array();
            var  invalidColors  =  new  Array();

            validColors.push("Color Code, Color Name");    
            invalidColors.push("Color Code, Color Name");    

            for (var  i  =  0;  i  <  col.length; i++)     {
                swatchName = col[i].name
                if (swatchName.slice(0, 1) != "[") {
                    var colorName = swatchName.slice(0, -5);
                    var colorCode = swatchName.slice(-4);

                    var isValid = alphanumeric.test(colorCode);
                    if (isValid) {
                        validColors.push(colorName.trim() + "," + colorCode);  
                    } else {
                        invalidColors.push(colorName.trim() + "," + colorCode);
                    }
                } 
            }

            var  listName  =  doc.name  +  "_valid.csv";  
            var  listfile  =  destFolder  +  "/"  +  listName;  
            var  thefile  =  new  File(listfile);  //pass the file to a Variable    
            var  isopen  =  thefile.open("w");  //open file for editing    

            if  (isopen) //test file is open    
            {    
                thefile.seek(0, 0);    

                for (var  j  =  0;  j  < validColors.length;  j++)         {    
                    thefile.writeln(validColors[j]);        
                }    

                thefile.close();       
            } else {
                throw 'Valid Colors Export Aborted';  
            }

            var  listName  =  doc.name  +  "_invalid.csv";  
            var  listfile  =  destFolder  +  "/"  +  listName;  
            var  thefile  =  new  File(listfile);  //pass the file to a Variable    
            var  isopen  =  thefile.open("w");  //open file for editing    

            if  (isopen) //test file is open    
            {    
                thefile.seek(0, 0);    

                for (var  j  =  0;  j  < invalidColors.length;  j++)         {    
                    thefile.writeln(invalidColors[j]);        
                }    

                thefile.close();           
            } else {
                throw 'Invalid Colors Export Aborted'; 
            }

            alert('Export Complete');    
        }
    } else {  
        throw  new  Error('There are no documents open!');
    }  
} catch (e) {    
    alert( e.message,  "Script Alert",  true);  
}