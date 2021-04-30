const hbs = require(`hbs`);

hbs.registerHelper('formatLineBreak', function(textContent) {
    var newString = textContent.replace('\n', '<br>');
    return newString;
});

hbs.registerHelper('formatDate', function(date) {
    var newDate = new Date(date)
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][newDate.getMonth()];
	var day = newDate.getDate();
	var year = newDate.getFullYear();
	var newString = month + ' ' + day + ', ' + year;
    return newString;
});
