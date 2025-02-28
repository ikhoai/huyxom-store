# Deployment Guide for Huyxom Store

This guide explains how to deploy the Huyxom Store Management System to a Digital Ocean Droplet using Docker Compose.

## Prerequisites

- A Digital Ocean account
- A domain name (optional, but recommended for production)

## Step 1: Create a Digital Ocean Droplet

1. Log in to your Digital Ocean account
2. Click "Create" and select "Droplets"
3. Choose an image: Ubuntu 20.04 (LTS) x64
4. Select a plan: Basic (minimum 2GB RAM / 1 CPU recommended)
5. Choose a datacenter region close to your users
6. Add your SSH keys (recommended) or use password authentication
7. Click "Create Droplet"

## Step 2: Set Up the Droplet

Once your Droplet is created, SSH into it:

```bash
ssh root@your_droplet_ip
```

Update the system and install Docker and Docker Compose:

```bash
# Update the system
apt update && apt upgrade -y

# Install required packages
apt install -y curl git docker.io docker-compose

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Verify Docker is running
docker --version
docker-compose --version
```

## Step 3: Clone the Repository

1. Clone the repository to the Droplet:

```bash
mkdir -p /opt/huyxom-store
cd /opt/huyxom-store
git clone https://your-repository-url.git .
```

2. If you're using a private repository, make sure to configure SSH keys for access.

## Step 4: Configure Environment Variables

Create a `.env` file for production settings if needed:

```bash
nano .env
```

Add any production-specific configuration:

```
NODE_ENV=production
DB_PASSWORD=your_secure_password
```

Make sure to update the `docker-compose.yml` file to use these environment variables if needed.

## Step 5: Start the Application

1. Start the application using Docker Compose:

```bash
cd /opt/huyxom-store
docker-compose up -d
```

2. This will start all containers in detached mode (running in the background).

3. Verify the containers are running:

```bash
docker-compose ps
```

## Step 6: Seed the Database (First Time Setup)

Run the database seeder to populate initial data:

```bash
docker-compose exec backend npm run seed
```

## Step 7: Set Up Nginx for SSL (Optional, but recommended for production)

If you have a domain name and want to use HTTPS, you can set up Nginx with Let's Encrypt:

1. Install Certbot and Nginx:

```bash
apt install -y nginx certbot python3-certbot-nginx
```

2. Configure Nginx as a reverse proxy:

```bash
nano /etc/nginx/sites-available/huyxom-store
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable the site and obtain an SSL certificate:

```bash
ln -s /etc/nginx/sites-available/huyxom-store /etc/nginx/sites-enabled/
certbot --nginx -d yourdomain.com -d www.yourdomain.com
nginx -t
systemctl restart nginx
```

## Step 8: Set Up a Firewall (Recommended)

Configure a basic firewall:

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## Step 9: Set Up Monitoring and Backups (Recommended)

1. Set up regular database backups:

```bash
mkdir -p /opt/backups

# Create a backup script
cat > /opt/backups/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_DIR="/opt/backups"
docker-compose -f /opt/huyxom-store/docker-compose.yml exec -T db pg_dump -U postgres huyxom_store > $BACKUP_DIR/huyxom_store_$DATE.sql
find $BACKUP_DIR -name "huyxom_store_*.sql" -type f -mtime +7 -delete
EOF

chmod +x /opt/backups/backup.sh

# Add to crontab to run daily
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/backups/backup.sh") | crontab -
```

2. Consider using Digital Ocean's monitoring tools or set up a solution like Prometheus and Grafana.

## Step 10: Update the Application

When you need to update the application:

```bash
cd /opt/huyxom-store

# Pull the latest changes
git pull

# Rebuild and restart the containers
docker-compose down
docker-compose build
docker-compose up -d
```

## Troubleshooting

### Checking Logs

To check logs for any container:

```bash
docker-compose logs -f [service-name]
```

Example:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Database Connection Issues

If the backend can't connect to the database:

```bash
# Check if the database container is running
docker-compose ps

# Connect to the database directly
docker-compose exec db psql -U postgres -d huyxom_store

# Restart the backend
docker-compose restart backend
```

### Container Management

```bash
# Stop all containers
docker-compose down

# Restart a specific container
docker-compose restart [service-name]

# View container status
docker-compose ps

# Remove volumes (will delete all data!)
docker-compose down -v
```

## Security Considerations

- Change default passwords in the production environment
- Set up regular security updates for the server
- Consider using Docker secrets for sensitive information
- Implement proper backup strategies
- Use HTTPS in production with valid SSL certificates

## Performance Optimization

- For higher traffic, consider scaling the application with multiple backend instances
- Add Redis for caching if needed
- Optimize Postgres configuration for production use
- Consider using a CDN for static assets 