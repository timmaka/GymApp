var mainWin = Titanium.UI.createWindow({
    backgroundColor:'#FFFFFF',
    layout:'vertical'
});
 
 var exercisesWin = Titanium.UI.createWindow({
    backgroundColor:'#FFFFFF',
    layout:'vertical'
});
var exercisesview = Titanium.UI.createScrollView({
    scrollType:"vertical",
    left:'0dp',
    width:'100%'
});

var groupview = Titanium.UI.createScrollView({
    scrollType:"vertical",
    left:'0dp',
    width:'100%'
});
 
var btnHeight = 50;
var db = Ti.Database.install('/database.db', 'dymdatabase');
var groups = db.execute('SELECT * FROM groups');
var i = 0;
while (groups.isValidRow())
{
	groupview.add(Titanium.UI.createButton({
    width:'100%',
    top: i * btnHeight,
    height: btnHeight,
    numId: groups.fieldByName('id'),
    title: groups.fieldByName('name'),
	}));
	groups.next();
	i++;
}
groups.close();
groupview.addEventListener('click', function (e) {
	var exercises = db.execute("SELECT * FROM list");
	var k = 0;
	while (exercises.isValidRow())
	{
		exercisesview.add(Titanium.UI.createButton({
	    width:'100%',
	    top: k * btnHeight,
	    height:btnHeight,
	    numId:exercises.fieldByName('id'),
	    title: exercises.fieldByName('name'),
		}));
		exercises.next();
		k++;
	}
	exercises.close();
	exercisesWin.add(exercisesview);
	exercisesWin.open();
});

mainWin.add(groupview);
mainWin.open();

