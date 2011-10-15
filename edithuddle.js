jQuery(function(){
	jQuery('.edithuddle-button-container').html('<button class="edit-huddle-button">Fix It</button><div id="edithuddle-instructions" class="ui-widget ui-widget-content ui-helper-hidden ui-corner-bottom" style="width:128px; padding: 10px; font-size:0.9em;">Found an error?<br/><br/>Just select the problematic text to submit a report</div><div id="edithuddle-popout" class="ui-widget ui-widget-header ui-helper-hidden ui-corner-all" style="width:100px; font-size:0.8em; padding:10px"><div class="ui-helper-hidden" id="edithuddle-popout-choices"><form>The error is:<br/><input type="radio" name="error" value="spelling">Spelling</input><br/><input type="radio" name="error" value="grammar">Grammar</input><br/><input type="radio" name="error" value="factual">Factual</input><br/><input type="radio" name="error" value="website">Website</input></form></div><div class="ui-helper-hidden" id="edithuddle-popout-error"></div><div class="ui-helper-hidden" id="edithuddle-popout-thanks">Thanks! Your correction has been submitted.</div></div>');
	
	jQuery(".edit-huddle-button").button({icons: {secondary: "ui-icon-triangle-1-s"} }).click(function(){ 
		console.log(jQuery("#edithuddle-instructions").html());
		jQuery("#edithuddle-instructions").show("fast", function(){
			setTimeout(function(){
				jQuery("#edithuddle-instructions").hide("fast", function() {});
			}, 5000);
		});
	});
});

getSelected = function(){
	var t = '';
if(window.getSelection){
	t = window.getSelection();
}else if(document.getSelection){
	t = document.getSelection();
}else if(document.selection){
	At = document.selection.createRange().text;
}
return t;
}

jQuery(function(){
	jQuery(document).bind('mouseup', function(event){
		var selection = getSelected();
		if(selection != '')
		{
			var range = selection.getRangeAt(0);
			if(range.startContainer == range.endContainer)
			{
				//console.log(range.startOffset);
				//console.log(range.endOffset);
				//console.log(range.startContainer);
				//console.log(event.pageX);
				//console.log(event.pageY);
				jQuery("#edithuddle-popout div").hide();
				jQuery("#edithuddle-instructions").hide();
				jQuery("#edithuddle-popout-choices").show();
				jQuery("#edithuddle-popout").show("fade", {}, "fast").position({my: "left bottom", at: "center top", of: event});
				last_range = range
			}
			else
			{
				jQuery("#edithuddle-popout div").hide();
				jQuery("#edithuddle-instructions").hide();
				jQuery("#edithuddle-popout-error").empty().append("Please select from only one paragraph").show();
				jQuery("#edithuddle-popout").show("fade", {}, "fast").position({my: "left bottom", at: "center top", of: event});
			}
		}
		else
		{
			//console.log("unclick")
			jQuery("#edithuddle-popout").hide();
		}
	});
});


jQuery(function(){
	jQuery("#edithuddle-popout-choices form input").click(function(){
		//jQuery.post("http://127.0.0.1:8000/fixit/post/",
		//console.log( 
//{context: last_range.startContainer.textContent, start_offset: last_range.startOffset, end_offset: last_range.endOffset,error_type: jQuery(this).val(), selected_text: last_range.toString(), url: document.URL}, function(resp){console.log(resp);});
		jQuery.get("http://edithuddle.appspot.com/fixit", {content: last_range.startContainer.textContent, start_offset: last_range.startOffset, end_offset: last_range.endOffset,errorType: jQuery(this).val(), errorContent: last_range.toString(), url: document.URL, author:"John Smith",title:"My Blog Post"});

		jQuery("#edithuddle-popout div").hide();
		jQuery("#edithuddle-popout-thanks").show();
		jQuery("#edithuddle-popout input").val([]);
		setTimeout(function(){
			jQuery("#edithuddle-popout").hide("fade",{}, "slow");
		}, 4000);
	});
});

