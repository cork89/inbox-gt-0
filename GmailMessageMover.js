function MoveEmailsBySearch() {
    var categories = [
        "category:promotions",
        "category:social",
        "category:updates",
    ];
    var daysOld = 30;
    var cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    var cutoffDateStr = Utilities.formatDate(cutoffDate, Session.getScriptTimeZone(), "yyyy/MM/dd");
    var batchSize = 50;
    var threads;
    for (var i = 0; i < categories.length; i++) {
        // Search for threads in category, not starred, older than cutoffDate
        var query = "".concat(categories[i], " -is:starred before:").concat(cutoffDateStr);
        do {
            threads = GmailApp.search(query, 0, batchSize);
            for (var j = 0; j < threads.length; j++) {
                threads[j].moveToTrash();
            }
        } while (threads.length === batchSize);
    }
}
