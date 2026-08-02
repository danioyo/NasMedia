const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const API_KEY = '8b1e43728b1c17cc47afd3fde208e6b4';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const HERO_IMAGE_URL = 'https://image.tmdb.org/t/p/w1280';