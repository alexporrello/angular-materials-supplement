export class ReportService {
    ACTIVE: string;
    CONTROLLER: string;
    CONTROLLERSYSTEM: string;
    DESCRIPTION: string;
    FUNCTION: string;
    Inparams: string;
    OUTPARAMS: string;
    SERVICENAME: string;
    STOREDPROCEDURE: string;
    SYSTEM: string;
}

export interface ReportColumn {
    ABBREVIATION: string;
    COLUMNLABEL: string;
    COLUMNNAME: string;
    COLUMNORDER: number;
    COLUMNTYPE: string;
    COLUMNWIDTH: number;
    DATAPRECISION: string;
    DESCRIPTION: string;
    DRILLDOWNLEVEL: string;
    FORMATTER: string;
    GROUPNAME: string;
    MARKER: string;
    REPORTNAME: string;
    SECTIONNAME: string;
}

interface Definition {
    CSVTEMPLATE: string;
    DISABLESORT: string;
    DYNAMICREPORTFLAG: string;
    FILEBASENAME: string;
    PDFTEMPLATE: string;
    PIVOTFLAG: string;
    REPORTNAME: string;
    ROAD: string;
    STYLE: string;
    TITLE: string;
    VERSION: string;
}

interface Group {
    GROUPLABEL: string;
    GROUPNAME: string;
    PARENTGROUPNAME: string;
    REPORTNAME: string;
    SECTIONNAME: string;
}

interface UIGroup {
    GROUPLABEL: string;
    GROUPNAME: string;
    columns: Array<ReportColumn>;
}

export interface ReportSection {
    BREAKONGROUP: number;
    DRILLDOWN: string;
    DRILLDOWN_NAME: string;
    FOOTNOTE: string;
    GROUP_DISPLAY: string;
    HEADER_DISPLAY: string;
    MAXROWSFIRSTPAGE: number;
    MAXROWSOTHERPAGE: number;
    OUTPUT_PARAM_NAME: string;
    REPORT_HEADER_DISPLAY: string;
    SECTIONLABEL: string;
    SECTIONNAME: string;
    SECTIONORDER: number;
    SECTIONTYPE: string;
    UNIQUEKEY: string;
    columns?: Array<ReportColumn>;
    groupUI?: Array<UIGroup>;
}

export interface ReportSummary {
    COLUMNNAME: string;
    COLUMNORDER: number;
    COLUMNTYPE: string;
    COLUMNWIDTH: number;
    REPORTNAME: string;
    SECTIONNAME: string;
    SUMMARYDENOMINATOR: string;
    SUMMARYLABEL: string;
    SUMMARYNUMERATOR: string;
    SUMMARYTYPE: string;
}

export interface ReportDefinition {
    columns: Array<ReportColumn>;
    definition: Array<Definition>;
    groups: Array<Group>;
    sections: Array<ReportSection>;
    summaries: Array<ReportSummary>;
}
