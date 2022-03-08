# Markdown für einzelne Boxen
from IPython.display import HTML
from ipywidgets import IntSlider, Play, Layout, Output, VBox, HTML, Button, Dropdown, Combobox, HBox, Text, AppLayout
from IPython.display import clear_output
from IPython.core.display import display, HTML

style = "<style>"
style +="div.hilfe_header { background-color: #FDFFC3;border-color: #FDFFC3; border-left: 5px solid #FDFFC3; border-top: 5px solid #FDFFC3;border-right: 5px solid #FDFFC3; border-bottom: 5px solid #FDFFC3;padding: 0.5em; font-size: 25px;font-weight: bold; color: #000000}"
style +="div.hilfe { background-color: #FFFFE7;border-color: #FDFFC3; border-left: 5px solid #FDFFC3; border-top: 5px solid #FDFFC3;border-right: 5px solid #FDFFC3; border-bottom: 5px solid #FDFFC3; padding: 0.5em;}"
style+= "div.erklaerung_header { background-color: #96C69B;border-color: #96C69B; border-left: 5px solid #96C69B; border-right: 5px solid #96C69B; border-top: 5px solid #96C69B; border-bottom: 5px solid #96C69B;padding: 0.5em; font-size: 25px;font-weight: bold; color: #FFFFFF}"
style+= "div.erklaerung { background-color: #E9FFE7;border-color: #96C69B; border-left: 5px solid #96C69B; border-right: 5px solid #96C69B; border-bottom: 5px solid #96C69B;padding: 0.5em;}"
style +="div.hinweis_header { background-color: #D09E9E;border-color: #D09E9E; border-left: 5px solid #D09E9E; border-right: 5px solid #D09E9E; border-top: 5px solid #D09E9E; border-bottom: 5px solid #D09E9E;padding: 0.5em; font-size: 25px;font-weight: bold; color: #FFFFFF}"
style +="div.hinweis { background-color: #FFE8E8;border-color: #D09E9E; border-left: 5px solid #D09E9E; border-right: 5px solid #D09E9E; border-top: 5px solid #D09E9E; border-bottom: 5px solid #D09E9E;padding: 0.5em;}"
style +="div.aufgabe_header { background-color: #97A7C7;border-color: #97A7C7; border-left: 5px solid #97A7C7; border-right: 5px solid #97A7C7; border-top: 5px solid #97A7C7; border-bottom: 5px solid #97A7C7;padding: 0.5em; font-size: 25px;font-weight: bold; color: #FFFFFF}"
style +="div.aufgabe { background-color: #E9F4FF;border-color: #97A7C7; border-left: 5px solid #97A7C7; border-right: 5px solid #97A7C7; border-top: 5px solid #97A7C7; border-bottom: 5px solid #97A7C7;padding: 0.5em;}"
style +="div.task_header { background-color: #97A7C7;border-color: #97A7C7; border-left: 1px solid #97A7C7; border-right: 1px solid #97A7C7; border-top: 1px solid #97A7C7; border-bottom: 1px solid #97A7C7;padding: 0.5em; font-size: 20px;font-weight: bold; color: #FFFFFF}"
style +="div.task { background-color: #E9F4FF;border-color: #97A7C7; border-left: 5px solid #97A7C7; border-right: 5px solid #97A7C7; border-top: 5px solid #97A7C7; border-bottom: 5px solid #97A7C7;padding: 0.5em;font-size: 15px;}"


#add more styles here
style +="</style>"
HTML(style)

def hilfe(self, pText):

	anzeige = '<div class="hilfe_header"> Hilfe</div><div class="hilfe">' + pText + '</div>'
	def turnOn_help(self):
	    #for i in range(10):
	    clear_output(wait=True)
	    display(HBox([hideHelp_Button]))
	    display(HTML(toggle_code_str))
	    #display(HTML('<div class="hilfe_header"> Hilfe</div><div class="hilfe"> Dies ist eine Testausgabe</div>'))
	    display(HTML(anzeige))
	    #if showHelp == False:
	    #    showHelp = True
	    #else:
	    #    showHelp = False
	def turnOff_help(self):
	    #for i in range(10):    
	    clear_output(wait=True)
	    display(HBox([showHelp_Button]))
	    display(HTML(toggle_code_str))

	#Idea from Geekgineer at https://gist.github.com/Zsailer/5d1f4e357c78409dd9a5a4e5c61be552
	toggle_code_str = '''<form action="javascript:code_toggle()"><input type="submit" id="toggleButton" value="Bearbeitung Hilfetext ein/aus (für Lehrkräfte)" style="float: right;"></form>'''

	toggle_code_prepare_str = '''
    	<script>
    	function code_toggle() {
        	if ($('div.cell.code_cell.rendered.selected div.input').css('display')!='none'){
            	$('div.cell.code_cell.rendered.selected div.input').hide();
        	} else {
            	$('div.cell.code_cell.rendered.selected div.input').show();
        	}
    	}
    	</script>'''

	
	showHelp_Button = Button(description='Hilfe anzeigen', disabled=False, button_style='', style = {'button_color': '#FFFE76'},
                    layout = Layout(width = '200px'))


	hideHelp_Button = Button(description='Hilfe verstecken', disabled=False, button_style='', style={'button_color': '#FFFFB7'},  
                    layout = Layout(width = '200px'))
	display(HBox([showHelp_Button]))
	display(HTML(toggle_code_prepare_str + toggle_code_str))
	showHelp_Button.on_click(turnOn_help)
	hideHelp_Button.on_click(turnOff_help)

#display(HTML(toggle_code_prepare_str + toggle_code_str))