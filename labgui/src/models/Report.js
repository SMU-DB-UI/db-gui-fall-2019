
export class Report {
    constructor(id, byId, forId, reportText, status, severity) {
        this.id = id; 
        this.byId = byId;
        this.forId = forId;
        this.reportText = reportText;
        this.status = status;
        this.severity = severity;
    }
}
