export class TemplateSystem {

  constructor(
    private concertoValidator: ConcertoValidator
  ) {}

  validate(template: string, typeName: string, data: any) {

    const dataResult = this.concertoValidator.validate(typeName, data);

    const templateResult = TemplateMarkAnalyzer.analyze(template);

    const dataKeys = new Set(Object.keys(data));

    const missingInData = [...templateResult.variables].filter(
      v => !dataKeys.has(v)
    );

    const warnings = missingInData.map(
      v => `Template variable '${v}' not found in data model`
    );

    return {
      errors: dataResult.errors,
      warnings
    };
  }
}
