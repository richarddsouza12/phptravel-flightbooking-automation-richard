pipeline {
  agent any


  parameters {
      string(name: 'WORKERS', defaultValue: '1', description: 'Workers/Threads')
    }

  stages {

    stage('Install') {
      steps {
        bat 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
         bat "npx playwright test --workers=${params.WORKERS}"
      }
    }
  }

  post {
      always {
        publishHTML([
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Report',
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: true
        ])
      }
    }
  }