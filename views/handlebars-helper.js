const hbs = require(`hbs`);

hbs.registerHelper('formatText', function(text) {
    var formattedText = text.replace(/\n/g, '<br>');
    return new hbs.SafeString(formattedText);
});

hbs.registerHelper('formatDate', function(date) {
    var newDate = new Date(date)
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][newDate.getMonth()];
	var day = newDate.getDate();
	var year = newDate.getFullYear();
	var newString = month + ' ' + day + ', ' + year;
    return newString;
});
