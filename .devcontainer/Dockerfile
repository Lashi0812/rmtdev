# Use the official Ubuntu base image.
FROM ubuntu:22.04

# Install updates and essential packages.
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    build-essential \
    zsh \
    git \
    && rm -rf /var/lib/apt/lists/*

# Download and run the NodeSource setup script for Node.js 22.x (LTS).
RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && rm nodesource_setup.sh


# zsh plugin
ENV SHELL /bin/zsh
COPY .devcontainer/zsh-plugins/.p10k.zsh .devcontainer/zsh-plugins/ohmyzsh.sh /root/
RUN chmod +x /root/ohmyzsh.sh && sh -c /root/ohmyzsh.sh
