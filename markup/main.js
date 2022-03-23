define([
    'base/js/namespace',
    'base/js/events',
    'require',
    'jquery'
    ], function(Jupyter, events) {
		
		var mark_selected_as_expl = function () {
			var selected = Jupyter.notebook.get_selected_cell();
			mark_as_expl(selected);
		};
		
		var mark_as_expl = function (cell) {
			var inner_cell = cell.element[0].getElementsByClassName('inner_cell')[0];
			
			if (inner_cell.getElementsByClassName('markup_expl').length > 0) {
				return;
			}
			
			reset_layout();
			
			var header = document.createElement('div');
			var bold = document.createElement('b');
			var text = document.createTextNode("Erklärung");
			

			header.className = 'markup_header markup_expl';
			header.style.padding = '0.5em 0.5em 0.5em 0.4em';
			header.style.backgroundColor = '#c9e8dc';
			
			bold.appendChild(text);
			header.appendChild(bold);
			
			inner_cell.insertBefore(header, inner_cell.childNodes[0]);
			inner_cell.style = 'background-color:#edf7f3';
			
			cell.metadata.markup_type = 'expl';
		};
		
		var mark_selected_as_task = function () {
			var selected = Jupyter.notebook.get_selected_cell();
			mark_as_task(selected);
		};
		
		var mark_as_task = function (cell) {

			var inner_cell = cell.element[0].getElementsByClassName('inner_cell')[0];
			
			if (inner_cell.getElementsByClassName('markup_task').length > 0) {
				return;
			}
			
			reset_layout();
			
			var header = document.createElement('div');
			var bold = document.createElement('b');
			var text = document.createTextNode("Aufgabe");
			

			header.className = 'markup_header markup_task';
			header.style.padding = '0.5em 0.5em 0.5em 0.4em';
			header.style.backgroundColor = '#ced8e3';
			
			bold.appendChild(text);
			header.appendChild(bold);
			
			inner_cell.insertBefore(header, inner_cell.childNodes[0]);
			inner_cell.style = 'background-color:#eff2f6';
			
			cell.metadata.markup_type = 'task';
		};
		
		var mark_selected_as_red = function () {
			var selected = Jupyter.notebook.get_selected_cell();
			mark_as_red(selected);
		};
		
		var mark_as_red = function (cell) {
			var inner_cell = cell.element[0].getElementsByClassName('inner_cell')[0];
			
			if (inner_cell.getElementsByClassName('markup_red').length > 0) {
				return;
			}
			
			reset_layout();
			
			//var header = document.createElement('div');
			//var bold = document.createElement('b');
			//var text = document.createTextNode("Aufgabe");
			

			//header.className = 'markup_header markup_red';
			//header.style.padding = '0.5em 0.5em 0.5em 0.4em';
			//header.style.backgroundColor = '#ced8e3';
			
			//bold.appendChild(text);
			//header.appendChild(bold);
			
			//inner_cell.insertBefore(header, inner_cell.childNodes[0]);
			//inner_cell.style = 'background-color:#eff2f6';
			
			inner_cell.style.borderStyle = 'solid';
			inner_cell.style.borderColor = '#c98282';
			
			cell.metadata.markup_type = 'red';
		};
		
		var mark_selected_as_hint = function () {
			var selected = Jupyter.notebook.get_selected_cell();
			mark_as_hint(selected);
		};
		
		var mark_as_hint = function (cell) {
			var inner_cell = cell.element[0].getElementsByClassName('inner_cell')[0];
			
			if (inner_cell.getElementsByClassName('markup_hint').length > 0) {
				return;
			}
			
			reset_layout();
			
			var header = document.createElement('div');
			var bold = document.createElement('b');
			var text = document.createTextNode("Hilfe");
			

			header.className = 'markup_header markup_hint';
			header.style.padding = '0.5em 0.5em 0.5em 0.4em';
			header.style.backgroundColor = '#e4dfcd';
			
			bold.appendChild(text);
			header.appendChild(bold);
			
			inner_cell.insertBefore(header, inner_cell.childNodes[0]);
			inner_cell.style = 'background-color:#f6f4ee';
			
			try {
				var render = inner_cell.getElementsByClassName('text_cell_render')[0];
				render.style.display = "none";
				
				header.addEventListener("click", function() {
					
					var render = inner_cell.getElementsByClassName('text_cell_render')[0];
					
					if (render.style.display === "block") {
					  render.style.display = "none";
					} else {
					  render.style.display = "block";
					}
				});
			}
			catch(err) {
				console.log(err);
			}
			
			cell.metadata.markup_type = 'hint';
		};
		
		var reset_layout = function () {
			var selected = Jupyter.notebook.get_selected_cell();
			var inner_cell = selected.element[0].getElementsByClassName('inner_cell')[0];
			
			if (inner_cell.getElementsByClassName('markup_header').length > 0) {
				var header = inner_cell.getElementsByClassName('markup_header')[0];
				inner_cell.removeChild(header);
			}

			// coloring
			//inner_cell.style = 'background-color:#ffffff';
			inner_cell.style = '';
			
			// alternativ: get cell type dann cell to <cell_type>
		};
	
		var init = function () {
			var cells = Jupyter.notebook.get_cells();
			
			var i;
			for (i = 0; i < cells.length; i++) {
				var cell = cells[i];
				if (cell.metadata.hasOwnProperty('markup_type')){
					console.log(cell.metadata.markup_type);
					switch(cell.metadata.markup_type) {
						case 'expl':
							mark_as_expl(cell);
							break;
						case 'task':
							mark_as_task(cell);
							break;
						case 'red':
							mark_as_red(cell);
							break;
						case 'hint':
							mark_as_hint(cell);
							break;
					}
				}
			}
		};

		var expl_button = function () {
			Jupyter.toolbar.add_buttons_group([
				Jupyter.keyboard_manager.actions.register ({
					'help': 'Mark as explanation',
					'icon' : 'fa-exclamation',
					'handler': mark_selected_as_expl
				}, 'mark_as_expl', 'Mark as Explanation')
			])
		};
		
		var task_button = function () {
			Jupyter.toolbar.add_buttons_group([
				Jupyter.keyboard_manager.actions.register ({
					'help': 'Mark as task',
					'icon' : 'fa-tasks',
					'handler': mark_selected_as_task
				}, 'mark_as_task', 'Mark as Task')
			])
		};
		
		var hint_button = function () {
			Jupyter.toolbar.add_buttons_group([
				Jupyter.keyboard_manager.actions.register ({
					'help': 'Mark as explanation',
					'icon' : 'fa-question',
					'handler': mark_selected_as_hint
				}, 'mark_as_hint', 'Mark as hint')
			])
		};
		
		var red_button = function () {
			Jupyter.toolbar.add_buttons_group([
				Jupyter.keyboard_manager.actions.register ({
					'help': 'Mark as red box',
					'icon' : 'fa-exclamation-triangle',
					'handler': mark_selected_as_red
				}, 'mark_as_red', 'Mark as red box')
			])
		};
		
		var reset_button = function () {
			Jupyter.toolbar.add_buttons_group([
				Jupyter.keyboard_manager.actions.register ({
					'help': 'Reset',
					'icon' : 'fa-refresh',
					'handler': reset_layout
				}, 'reset_layout', 'Reset Layout')
			])
		};
		
		var initialize = function () {
			
		};
		
		
		// Run on start
		function load_ipython_extension() {
			expl_button();
			task_button();
			hint_button();
			red_button();
			reset_button();
			
			init();
            
			return Jupyter.notebook.config.loaded.then(initialize);
		};
		
		return {
			load_ipython_extension: load_ipython_extension
		};
	}
);
