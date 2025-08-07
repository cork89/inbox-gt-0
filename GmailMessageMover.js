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
    for (var i = 0; i < categories.length; i++) {
        // Search for threads in category, not starred, older than cutoffDate
        var query = categories[i] + " -is:starred before:" + cutoffDateStr;
        var threads_1 = GmailApp.search(query, 0, batchSize);
        GmailApp.moveThreadsToTrash(threads_1);
    }
}
