import issueGenerator from './issue-generator.js';

class DummyJira {
  constructor() {
    this.host = 'jira.host.com';
    this.projectName = 'Last Three';

    this.issues = {
      Bug1: issueGenerator('Bug1', 'Bug', 'yellow'),
      Bug2: issueGenerator('Bug2', 'Bug', 'green'),

      MT1: issueGenerator('MT1', 'Maintenance Task', 'yellow'),
      MT2: issueGenerator('MT2', 'Maintenance Task', 'green'),
      MT3: issueGenerator('MT3', 'Maintenance Task', 'yellow', 'Epic1'),
      MT4: issueGenerator('MT4', 'Maintenance Task', 'yellow', 'Epic4'),

      I1: issueGenerator('I1', 'Initiative', 'yellow'),
      I2: issueGenerator('I2', 'Initiative', 'yellow'),
      I3: issueGenerator('I3', 'Initiative', 'red'),

      DeploymentTask1:issueGenerator('DeploymentTask1', 'Deployment Task', 'yellow'),

      Epic1: issueGenerator('Epic1', 'Epic', 'yellow'),
      //Epic2: issueGenerator('Epic2', 'Epic', 'green'), // Missing tests?
      Epic3: issueGenerator('Epic3', 'Epic', 'yellow', 'I2', 'Initiative', 'Relates'),
      Epic4: issueGenerator('Epic4', 'Epic', 'red', 'I2', 'Initiative', 'Relates'),
      //Epic5: issueGenerator('Epic5', 'Epic', 'yellow', 'I3', 'Initiative', 'Relates'), // Missing tests?

      // Valid Parents
      Story1: issueGenerator('Story1', 'Story', 'yellow', 'Epic3', 'Epic'),
      Story2: issueGenerator('Story2', 'Story', 'yellow', 'I2', 'Initiative', 'Relates'),

      // Invalid Parents
      Story3: issueGenerator('Story3', 'Story', 'yellow', 'Epic4', 'Epic'),
      Story4: issueGenerator('Story4', 'Story', 'yellow', 'I3', 'Initiative', 'Relates'),
      Story5: issueGenerator('Story5', 'Story', 'yellow', 'I2', 'Initiative', 'Blocks'),

      // Invalid Story
      Story6: issueGenerator('Story6', 'Story', 'red', 'Epic4', 'Epic'),
      //Story7: issueGenerator('Story7', 'Story', 'green'), // Missing tests?
      //Story8: issueGenerator('Story8', 'Story', 'yellow'), // Missing tests?

      // Valid Parents
      SubTask1: issueGenerator('SubTask1', 'Sub-task', 'yellow', 'Story1'),
      SubTask2: issueGenerator('SubTask2', 'Sub-task', 'yellow', 'Story2'),
      SubTask3: issueGenerator('SubTask3', 'Sub-task', 'yellow', 'MT1'),
      SubTask4: issueGenerator('SubTask4', 'Sub-task', 'yellow', 'MT3'),
      SubTask5: issueGenerator('SubTask5', 'Sub-task', 'yellow', 'MT4'),
      SubTask6: issueGenerator('SubTask6', 'Sub-task', 'yellow', 'Bug1'),

      // Invalid Parents
      SubTask7: issueGenerator('SubTask7', 'Sub-task', 'yellow', 'Story3'),
      SubTask8: issueGenerator('SubTask8', 'Sub-task', 'yellow', 'Story4'),
      SubTask9: issueGenerator('SubTask9', 'Sub-task', 'yellow', 'Story6'),
      SubTask10: issueGenerator('SubTask10', 'Sub-task', 'yellow', 'MT2'),
      SubTask11: issueGenerator('SubTask11', 'Sub-task', 'yellow', 'Bug2'),

      // Invalid SubTask
      SubTask12: issueGenerator('SubTask12', 'Sub-task', 'red', 'Story6'),
      SubTask13: issueGenerator('SubTask13', 'Sub-task', 'green', 'MT1'),
      SubTask14: issueGenerator('SubTask14', 'Sub-task', 'green', 'Bug1'),
      SubTask15: issueGenerator('SubTask15', 'Sub-task', 'green'),
      //SubTask1: issueGenerator('SubTask1', 'Sub-task', 'yellow'), // Missing tests?

      Task1: issueGenerator('Task1', 'Task', 'yellow'),

      FeatureDefect1: issueGenerator('FeatureDefect1', 'Feature Defect', 'yellow', 'Story2', 'Story')
      //FeatureDefect2: issueGenerator('FeatureDefect2', 'Feature Defect', 'green', 'Story2', 'Story') // Missing tests?
    };

    this.fields = {
      'epicLink': [{
        'id': 'customfield_10805',
        'name': 'Epic Link'
      }],
      'noEpicLink': []
    };

    this.projects = [
      {
        'key': 'ABC',
        'name': 'First Three'
      },
      {
        'key': 'XYZ',
        'name': 'Last Three'
      }
    ];
  }

  findIssue(key) {
    if(this.issues[key] === undefined) {
      return Promise.reject(new Error(`Issue ${key} does not exist.`));
    }

    return Promise.resolve(this.issues[key]);
  }

  listFields() {
    return Promise.resolve(this.fields.epicLink);
  }

  listProjects() {
    return Promise.resolve(this.projects);
  }
}

export default DummyJira;
