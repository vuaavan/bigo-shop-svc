pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "my-shop-service" // Change to your Docker image name
        DOCKER_CONTAINER_NAME = "shop" // Change to your Docker container name
        DOCKER_PORT_MAPPING = "8080:8080" // Adjust if needed
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the latest code from your Git repository
                git 'https://your-git-repo-url.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${env.DOCKER_IMAGE_NAME} ."
                }
            }
        }

        stage('Stop and Remove Existing Container') {
            steps {
                script {
                    // Stop and remove the existing container
                    sh """
                    docker stop ${env.DOCKER_CONTAINER_NAME} || true
                    docker rm ${env.DOCKER_CONTAINER_NAME} || true
                    """
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    // Run a new container with the updated image
                    sh "docker run -d --name ${env.DOCKER_CONTAINER_NAME} -p ${env.DOCKER_PORT_MAPPING} ${env.DOCKER_IMAGE_NAME}"
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace after the build
            cleanWs()
        }
    }
}