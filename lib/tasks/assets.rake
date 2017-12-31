Rake::Task["assets:precompile"]
    .clear_prerequisites
    .enhance(['assets:compile_environment'])

namespace :assets do
  # In this task, set prerequisites for the assets:precompile task
  task :compile_environment do
    Rake::Task['assets:environment'].invoke
  end
end