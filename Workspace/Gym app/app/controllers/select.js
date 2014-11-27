// get the arguments that were passed in.
var args = arguments[0] || {};

// create a window and view for muscle groups
var mainWin = Titanium.UI.createWindow({
    backgroundColor: '#F2F2F2',
    layout:'vertical',
    title: 'Muscle groups'
});

var groupview = Titanium.UI.createScrollView({
    scrollType:"vertical",
    left:'0dp',
    width:'100%',
    height: '90%'
});

// create a window and view for exercises   
var exercisesWin = Titanium.UI.createWindow({
    backgroundColor: '#F2F2F2',
    layout:'vertical',
    title: 'Exercises'
});
var exercisesview = Titanium.UI.createScrollView({
    scrollType:"vertical",
    left:'0dp',
    width:'100%'
});

// event listener for when a exercise is selected
exercisesview.addEventListener('click', function(e) {
	if (e.source.title != null)
	{
		// open a forms window that is controleld by forms.js and give it necessary variables
		Alloy.createController('forms', {title: e.source.title, db: args.db, workout_id: args.workout_id, exercisesWin: exercisesWin}).getView;
	}
});

// get the muscle groups
var groups = args.db.execute('SELECT * FROM groups ORDER BY name COLLATE NOCASE ASC');
var i = 0;

// create the buttons for the muscle groups
while (groups.isValidRow())
{
	groupview.add($.UI.create('Button', {
	    top: 10 + i * 60,
	    title: groups.fieldByName('name'),
	    id: 'button'
	}));
	groups.next();
	i++;
}
// close the queryd info
groups.close();

// for keeping track of the buttons you've created
var exercise_buttons = [];

// event listener for when a muscle group button is pressed
groupview.addEventListener('click', function (e) {
	// to make sure a blank area was not clicked
	if (e.source.title != null)
	{
		// get the relevant ecercises from the database
		var exercises = args.db.execute("SELECT * FROM list where muscle_group = ? ORDER BY name COLLATE NOCASE ASC", e.source.title);
		var k = 0;
		
		// remove already existing buttons if any
		for (i = 0; i < exercise_buttons.length; i++)
		{
			exercisesview.remove(exercise_buttons[i]);
		}
		
		// create the buttons for the exercises and add them to the view
		while (exercises.isValidRow())
		{
			var button = $.UI.create('Button', {
			    top: 10 + k * 60,
			    title: exercises.fieldByName('name'),
			    id: 'button'
			});
			exercise_buttons.push(button);
			exercisesview.add(button);
			exercises.next();
			k++;
		}
		
		// close the queryd info
		exercises.close();
		
		// add the exercises view to the window and open it
		exercisesWin.add(exercisesview);
		exercisesWin.open();
	}
});

var endview = Titanium.UI.createScrollView({
    scrollType:"vertical",
    bottom:'0dp',
    width:'100%',
    height: '10%'
});

var endBut = $.UI.create('Button', {
    top: 0,
    title: 'End Workout',
    id: 'button'
});

endBut.addEventListener('click', function(e) {
	Ti.App.fireEvent('workout_ended');
	mainWin.close();
});

endview.add(endBut);

// add the views to the main window and open it
mainWin.add(groupview);
mainWin.add(endview);
mainWin.open();

