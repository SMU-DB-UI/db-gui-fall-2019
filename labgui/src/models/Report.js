export class Report {
    constructor(id, byId, forId, reportText, date, status, severity) {
        this.id = id; 
        this.byId = byId;
        this.forId = forId;
        this.reportText = reportText;
        this.date = date;
        this.status = status;
        this.severity = severity;
        this.reportInfo = {};
    }
}
