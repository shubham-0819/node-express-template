import mongoose from 'mongoose';
import setupTestDB from '../../../utils/setupTestDB.js';
import paginate from '../../../../src/models/plugins/paginate.plugin.js';
import { expect } from 'chai';

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

projectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'project',
});

projectSchema.plugin(paginate);
const Project = mongoose.model('Project', projectSchema);

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Project',
    required: true,
  },
});

taskSchema.plugin(paginate);
const Task = mongoose.model('Task', taskSchema);

setupTestDB();

describe('paginate plugin', () => {
  describe('populate option', () => {
    it('should populate the specified data fields', async () => {
      Project.create({ name: 'Project One' }).then((project) => {
        Task.create({ name: 'Task One', project: project._id }).then((task) => {
          Task.paginate({ _id: task._id }, { populate: 'project' }).then((taskPages) => {
            expect(taskPages.results[0].project).to.have.property('_id', project._id);
            Promise.resolve();
          });
        });
      });
    });

    it('should populate nested fields', async () => {
      Project.create({ name: 'Project One' }).then((project) => {
        Task.create({ name: 'Task One', project: project._id }).then((task) => {
          Project.paginate({ _id: project._id }, { populate: 'tasks.project' }).then((projectPages) => {
            const { tasks } = projectPages.results[0];
            expect(tasks).to.have.lengthOf(1);
            expect(tasks[0]).to.have.property('_id', task._id);
            expect(tasks[0].project).to.have.property('_id', project._id);
            Promise.resolve();
          });
        });
      });
    });

    // write few more tests to cover all the cases
    it('should return paginated results with default options', async () => {
      const projects = [{ name: 'Project One' }, { name: 'Project Two' }, { name: 'Project Three' }];

      Project.create(projects).then(() => {
        Project.paginate({}, {}).then((projectPages) => {
          expect(projectPages.results).to.have.lengthOf(3);
          expect(projectPages.totalPages).to.equal(1);
          expect(projectPages.currentPage).to.equal(1);
          expect(projectPages.hasNextPage).to.be.false;
          expect(projectPages.hasPrevPage).to.be.false;
          Promise.resolve();
        });
      });
    });

    it('should return paginated results with custom options', async () => {
      const tasks = [
        { name: 'Task One', project: new mongoose.Types.ObjectId() },
        { name: 'Task Two', project: new mongoose.Types.ObjectId() },
        { name: 'Task Three', project: new mongoose.Types.ObjectId() },
      ];

      Task.create(tasks).then(() => {
        const paginationOptions = { page: 2, limit: 2, sort: { name: -1 } };

        Task.paginate({}, paginationOptions).then((result) => {
          expect(result.results).to.have.lengthOf(1);
          expect(result.totalPages).to.equal(2);
          expect(result.currentPage).to.equal(2);
          expect(result.hasNextPage).to.be.false;
          expect(result.hasPrevPage).to.be.true;
          Promise.resolve();
        });
      });
    });

    it('should handle invalid pagination options', async () => {
      const paginationOptions = { page: -1, limit: 10 };

      Project.paginate({}, paginationOptions)
        .then(() => {})
        .catch((error) => {
          expect(error).to.be.an('error');
          expect(error.message).to.equal('Invalid pagination options');
          Promise.resolve();
        });
    });
  });
});
