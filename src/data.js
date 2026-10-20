// All site content lives here. Edit this file to update the portfolio —
// the sections in index.html are rendered from these objects.
// Fields left as '' are hidden on the page; fill them in when you have the details.

const asset = (p) => `${import.meta.env.BASE_URL}assets/${p}`;

export const profile = {
  name: 'Parth Mahajan',
  role: 'Robotics Software Engineer',
  focus: ['SLAM', 'Localization', 'State Estimation'],
  tagline: 'I’m a robotics engineer specializing in SLAM, localization and state estimation, with a current flavour of deep learning and AI for functional robustness.',
  location: 'Boston, MA, USA',
  email: { user: 'mahajan.parth', domain: 'northeastern.edu' },
  photo: asset('img/parth-portrait.webp'),
  resume: '', // add your CV at public/assets/resume.pdf, then set: asset('resume.pdf')
  links: {
    github: 'https://github.com/mahajanparth',
    linkedin: 'https://www.linkedin.com/in/parth-mahajan-6118705b/',
    medium: 'https://medium.com/@parthmhajan',
    scholar: 'https://scholar.google.com/citations?user=vpaEeysAAAAJ&hl=en',
  },
  mottoIntro: 'My favourite quote, and one I follow closely',
  motto: 'The fastest way to learn something is to teach it.',
  mottoBy: 'Inspired by Richard Feynman',
  bio: [
    'I’m particularly interested in bringing algorithms out of simulation and making them work reliably on real robots.',
    'I’ve worked with magnetic ship-hull crawlers, warehouse autonomous mobile robots, electric vehicles and swarms of 20+ drones, and each has given me hands-on experience tackling challenges in perception, sensor fusion and autonomous navigation.',
    'I’m currently finishing my M.S. in Robotics at Northeastern University. Looking ahead, I want to build at the intersection of robotics, AI, software engineering and entrepreneurship, turning research into practical, real-world systems.',
    'Outside of robotics, I enjoy painting and am learning to play the violin.',
    'If you’re building something interesting in robotics, I’d love to connect.',
  ],
};

export const stats = [
  // Counts for blogs, projects, papers and certifications are filled from their lists at the bottom of this file.
  { value: 0, suffix: '+', label: 'technical blogs written' },
  { value: 0, suffix: '+', label: 'projects, in simulation and on hardware' },
  { value: 0, suffix: '', label: 'research papers published' },
  { value: 5, suffix: '+', label: 'real robot platforms deployed on: crawler, AMR, robot arm, EV and drone swarm' },
  { value: 0, suffix: '+', label: 'AI/math certifications earned on Coursera' },
];

export const education = [
  {
    school: 'Northeastern University',
    degree: 'M.S. in Robotics · GPA 4.0/4.0',
    period: 'Sep 2024 – Dec 2026 (expected)',
    place: 'Boston, MA',
    logo: 'NU',
    note: 'Mobile Robotics, Computer Vision, Deep Learning, Control Systems, High Performance Computing',
  },
  {
    school: 'Delhi Technological University',
    degree: '', // TODO: confirm degree
    period: '',
    place: 'New Delhi, India',
    logo: 'DTU',
    note: 'Unmanned Aerial Systems DTU (team lead)',
  },
];

export const skills = [
  { group: 'SLAM & Estimation', items: ['GTSAM Factor Graphs', 'VO / VIO-SLAM', 'EKF', 'Particle Filters', 'LM / Gauss-Newton', 'Sensor Synchronization', 'Lie Theory'] },
  { group: 'Calibration & Perception', items: ['Intrinsic & Extrinsic Calibration', 'Hand-Eye Calibration', '6-DoF Grasp Pose Estimation', 'Segmentation', 'Deep Optical Flow'] },
  { group: 'Planning & Control', items: ['Diffusion Motion Planning', 'Pure Pursuit & Stanley', 'Swarm Control', 'Behavior Trees', 'Nav2'] },
  { group: 'Sensors & Sim', items: ['LiDAR', 'Camera', 'IMU', 'GNSS', 'Ultrasonic', 'NVIDIA Isaac Sim', 'Gazebo', 'RViz2'] },
  { group: 'AI / DL', items: ['PyTorch', 'TensorRT', 'OpenVINO', 'PPO / TD3', 'scikit-learn', 'Weights & Biases'] },
  { group: 'Languages & Tools', items: ['C++', 'Python', 'ROS 2', 'Eigen', 'OpenCV', 'Open3D', 'CUDA', 'Docker', 'Linux', 'Git'] },
];

// Overview, oldest first. Detailed cards live in `experience`.
export const timeline = [
  {
    title: 'Unmanned Aerial Systems DTU',
    sub: 'Team lead · Swarm robotics',
    period: '2018 – 2020',
    text: 'National finalist at the DRDO Robotics and Unmanned Systems Exposition (2018), 1st place at the Drone Olympics (2019), and Phase II winner of the IAF Meher Baba Prize (2020).',
  },
  {
    title: 'Addverb Limited',
    sub: 'Robotics Software Engineer L2',
    period: 'Aug 2021 – Aug 2023',
    text: 'Calibration, sensor drivers and ROS 2 migration for the AMR200, model acceleration with TensorRT and OpenVINO, and a UR5 bin-picking system.',
  },
  {
    title: 'Robotics Research Center, IIIT Hyderabad',
    sub: 'Research Assistant',
    period: 'May 2023 – Aug 2024',
    text: 'GNSS factors for LeGO-LOAM, Guided Polynomial Diffusion (IEEE CASE 2025), and Pure Pursuit and Stanley control on a 1-ton electric vehicle.',
  },
  {
    title: 'Northeastern University',
    sub: 'M.S. in Robotics',
    period: 'Sep 2024 – Dec 2026',
    text: 'GPA 4.0. Projects in certifiable calibration, sensor fusion, visual SLAM and humanoid RL.',
  },
  {
    title: 'Crabi Robotics',
    sub: 'Localization and Navigation Intern',
    period: 'May 2025 – Dec 2025',
    text: 'Multi-session V-SLAM for ship-hull inspection robots, a speckle-laser optical odometry prototype and 4-wheel independent steering.',
  },
];

export const experience = [
  {
    org: 'Crabi Robotics',
    logo: 'CR',
    url: '',
    role: 'Localization and Navigation Intern',
    tech: 'C++ · ROS 2 · GTSAM · Isaac Sim',
    place: 'Boston, MA',
    period: 'May 2025 – Dec 2025',
    points: [
      'Built a multi-session V-SLAM pipeline on low-texture ship hulls, fusing loosely coupled wheel and IMU odometry, AprilTag loop closures and opportunistic visual constraints for under 15 cm trajectory RMSE.',
      'Prototyped a speckle-laser optical odometry system that estimates motion from optical flow of interference patterns, reaching about 1% trajectory error on closed loops.',
      'Replaced skid-steer with 4-wheel independent-steering forward and inverse kinematics, cutting tread wear by 30%.',
      'Created a physics-based Isaac Sim pipeline for sensor-faithful data, mapping validation and client demos.',
    ],
  },
  {
    org: 'Robotics Research Center, IIIT Hyderabad',
    logo: 'RRC',
    url: 'https://robotics.iiit.ac.in',
    role: 'Research Assistant',
    tech: 'C++ · LeGO-LOAM · GNSS · Diffusion Models · Vehicle Control',
    place: 'Hyderabad, India',
    period: 'May 2023 – Aug 2024',
    points: [
      'Extended LeGO-LOAM with GNSS position factors in its factor-graph backend, jointly optimizing LiDAR odometry and global position to reduce long-term drift.',
      'Co-first author of Guided Polynomial Diffusion (IEEE CASE 2025): DDIM sampling with Bernstein polynomials for safe manipulator trajectories, 10× faster than EDMP.',
      'Developed and tuned Pure Pursuit and Stanley controllers in C++ on a 1-ton Mahindra electric vehicle, holding mean cross-track error to 0.15 m.',
    ],
  },
  {
    org: 'Addverb Limited',
    logo: 'A',
    url: 'https://addverb.com',
    role: 'Robotics Software Engineer L2',
    tech: 'C++ · ROS / ROS 2 · OpenCV · TensorRT · OpenVINO',
    place: 'Noida, India',
    period: 'Aug 2021 – Aug 2023',
    points: [
      'Wrote an eye-in-hand and eye-to-hand calibration pipeline in C++ and OpenCV, with under 0.3 px test-set reprojection RMSE.',
      'Developed C++ ROS drivers for the LiDAR and ultrasonic sensors behind the AMR safety modules, and migrated core AMR200 perception and navigation from ROS 1 to ROS 2.',
      'Accelerated SegNet models with TensorRT, OpenVINO and DV SDKs through UInt8 and FP16 post-training quantization, for 2 to 5× throughput at the same precision.',
      'Led an end-to-end UR5 bin-picking system with deep-learning 6-DoF grasp pose estimation across 1.5K+ SKUs.',
    ],
  },
  {
    org: 'Unmanned Aerial Systems DTU',
    logo: 'UAS',
    url: '',
    role: 'Team Lead',
    tech: 'Multi-agent Control · Consensus · PSO · UAVs',
    place: 'Delhi & Jaisalmer, India',
    period: '2018 – 2020',
    points: [
      'Led a 25-member UAV team to the Phase II win of the Indian Air Force Meher Baba Prize ($30K award, Mar 2020).',
      'Built a decentralized, consensus-based swarm controller and flew it with 21 UAVs in Jaisalmer.',
      '1st place at the Drone Olympics among 1,000+ startups with an autonomous drone (Feb 2019).',
      'National finalist at the DRDO Robotics and Unmanned Systems Exposition with a GPS-denied drone demo (Apr 2018).',
    ],
  },
];

export const categories = ['All', 'SLAM & Estimation', 'Perception', 'Learning', 'Motion Planning', 'Control', 'Swarms'];

const gh = (repo) => `https://github.com/mahajanparth/${repo}`;

// Newest first. `image` or `video` (mp4 in public/assets/video, with `image` as its
// poster) are optional; projects without either get a generated illustration from `art`.
// `repo` adds a GitHub link, `status` shows a small badge.
export const projects = [
  {
    title: 'Multi-Session V-SLAM on Ship Hulls',
    sub: 'Crabi Robotics · C++, ROS 2, GTSAM',
    tags: ['SLAM & Estimation', 'Perception'],
    org: 'Crabi Robotics',
    art: 'slam',
    text: 'SLAM for a hull-inspection crawler on low-texture steel: wheel and IMU odometry, AprilTag loop closures and opportunistic visual constraints in one factor graph, with under 15 cm trajectory RMSE across sessions.',
  },
  {
    title: 'Uncertainty-Aware Camera Calibration',
    sub: 'Certifiable, information-driven view selection',
    tags: ['Perception', 'SLAM & Estimation'],
    org: 'Northeastern',
    video: asset('video/calib.mp4'),
    image: asset('img/calib-poster.webp'),
    repo: gh('Uncertainity_Aware_Calibration'),
    text: 'Scores candidate views by marginal Fisher information (Schur complement) and picks E-, A- or D-optimal subsets with greedy and Frank–Wolfe solvers that carry duality-gap certificates. On real ChArUco data it cut held-out reprojection RMSE 15% (0.883 to 0.752 px) versus random views, within 2.5% of exhaustive-search optima.',
  },
  {
    title: 'Certifiable Galilean IMU Preintegration',
    sub: 'QCQP + SDP relaxation of the Gal(3) factor',
    tags: ['SLAM & Estimation'],
    org: 'Research',
    status: 'In progress',
    art: 'ellipse',
    repo: gh('CERTIFIABLE_GAL_IMU_SLAM'),
    text: 'Applying certifiable optimization to the direct-product Galilean IMU preintegration factor used in GTSAM, so the estimate comes with a certificate that it is globally optimal.',
  },
  {
    title: 'G1 Humanoid Obstacle Avoidance',
    sub: 'PPO vs TD3 with LiDAR · Unitree G1',
    tags: ['Learning', 'Control'],
    org: 'Northeastern',
    video: asset('video/g1.mp4'),
    image: asset('img/g1-poster.webp'),
    repo: gh('G1_Humanoid_Obstacle_Avoidance_RL'),
    text: 'Obstacle-aware locomotion for the 29-DOF Unitree G1 in Isaac Lab. PPO with LiDAR reaches a 94.5% survival rate in cluttered worlds; two-stage training gives 34× longer episodes than zero-shot transfer.',
  },
  {
    title: 'EKF Sensor Fusion',
    sub: 'Wheel odometry + IMU · ROS 2 / C++',
    tags: ['SLAM & Estimation'],
    org: 'Personal',
    video: asset('video/ekf.mp4'),
    image: asset('img/ekf-poster.webp'),
    repo: gh('SensorFusion'),
    text: 'An 8-state Extended Kalman Filter with pluggable motion and observation models. On a 247 m outdoor drive, the best variant cuts position error from 19.6 m to 1.7 m and heading error from 36° to 1.2°.',
  },
  {
    title: 'JEV Smart Robot Control',
    sub: 'ROS 2 · Nav2 · TurtleBot3',
    tags: ['Motion Planning', 'Control'],
    org: 'Personal',
    image: asset('img/jev.webp'),
    repo: gh('JEV_SMARTROBOTCONTROL'),
    text: 'A TurtleBot3 localizes with AMCL in a simulated house while Jev picks mission and recovery actions and supervises Nav2. A live browser dashboard shows its decisions, action probabilities and localization health.',
  },
  {
    title: 'LM-DROID-SLAM',
    sub: 'Levenberg–Marquardt inside DROID-SLAM',
    tags: ['SLAM & Estimation', 'Learning'],
    org: 'Northeastern',
    art: 'slam',
    repo: gh('LM-DroidSlam'),
    text: 'Replaced DROID-SLAM’s dense bundle-adjustment layers with a differentiable LM solver, benchmarked ATE on TartanAir, and profiled the pipeline. Graph aggregation (30.7%) and the update operator (35%) take up most of the runtime.',
  },
  {
    title: 'Multi-Camera Ego-Motion',
    sub: 'Scale-free optical-flow formulation',
    tags: ['Perception', 'SLAM & Estimation'],
    org: 'Northeastern',
    image: asset('img/ego-motion.webp'),
    repo: gh('Ego_Motion_Estimation'),
    text: 'Derived depth-free ego-motion equations from dense optical flow across a six-camera rig and solved them with gradient-based optimization on nuScenes. Adding cameras lowered both rotation and translation error.',
  },
  {
    title: 'Guided Polynomial Diffusion',
    sub: 'IEEE CASE 2025 · DDIM + Bernstein polynomials',
    tags: ['Motion Planning', 'Learning'],
    org: 'RRC, IIIT-H',
    art: 'diffusion',
    link: 'https://arxiv.org/abs/2501.18229',
    text: 'Diffusion-based trajectory generation for manipulators that samples Bernstein-polynomial coefficients with DDIM and guides them toward safe, collision-free motion. Sampling is 10× faster than EDMP.',
  },
  {
    title: 'LeGO-LOAM + GNSS',
    sub: 'Global position factors for LiDAR SLAM',
    tags: ['SLAM & Estimation'],
    org: 'RRC, IIIT-H',
    art: 'ellipse',
    text: 'Added GNSS measurements as position factors to LeGO-LOAM’s factor-graph backend, so LiDAR odometry and global position are optimized jointly and long-term drift stays bounded.',
  },
  {
    title: 'Collision-Free Diffusion',
    sub: 'DDPM + Fast ESDF guidance',
    tags: ['Motion Planning', 'Learning'],
    org: 'Research',
    art: 'diffusion',
    text: 'Diffusion-based motion planning with differentiable guidance constraints, producing collision-free, dynamically feasible trajectories. ESDF guidance comes from NVIDIA nvblox to keep it fast.',
  },
  {
    title: 'CLIP Explorer',
    sub: 'Interactive labs for the CLIP paper',
    tags: ['Learning', 'Perception'],
    org: 'Personal',
    art: 'clip',
    repo: gh('CLIP_EXPERIMENTS'),
    text: 'Eight Streamlit labs that connect CLIP’s dual-encoder architecture to contrastive learning, zero-shot classification, prompt ensembling, retrieval and limitation probes. Everything runs offline.',
  },
  {
    title: 'Pick & Place Bin Picking',
    sub: 'UR5 · 1.5K+ SKUs · Addverb',
    tags: ['Motion Planning', 'Perception'],
    org: 'Addverb',
    art: 'arm',
    text: 'An end-to-end UR5 bin-picking system that I led: deep-learning 6-DoF grasp pose estimation across 1.5K+ SKUs, collision-free arm trajectories, and a Behavior Tree framework for task execution.',
  },
  {
    title: 'DYNAMO AMR',
    sub: 'Autonomous mobile robot · Addverb',
    tags: ['Perception'],
    org: 'Addverb',
    art: 'lidar',
    text: 'Designed and tested the camera calibration and collision-safety detection modules, and wrote low-level drivers for the LiDAR and ultrasonic sensors the robot uses to navigate busy warehouses.',
  },
  {
    title: 'MOPSO Multi-Target Search',
    sub: 'Published at IEEE ICARA 2021',
    tags: ['Swarms', 'Motion Planning'],
    org: 'UAS DTU',
    video: asset('video/mopso.mp4'),
    image: asset('img/mopso-poster.webp'),
    repo: gh('MOPSO'),
    text: 'Decentralized multi-target search for UAV swarms: a PSO variant for time-optimal search, optimized payload drops and inter-UAV collision avoidance. Tested in ArduPilot SITL with a ground-control station.',
  },
  {
    title: 'Meher Baba Swarm',
    sub: '21 UAVs · Jaisalmer desert',
    tags: ['Swarms', 'Control'],
    org: 'UAS DTU',
    image: asset('img/swarm-flight.webp'),
    text: 'Field demonstration of our fully autonomous, decentralized swarm controller for the Indian Air Force Meher Baba Prize. The system was designed for large-scale search and rescue.',
  },
  {
    title: 'Decentralized Swarm Controller',
    sub: 'Consensus-based multi-agent control',
    tags: ['Swarms', 'Control'],
    org: 'UAS DTU',
    image: asset('img/swarm-desert.webp'),
    text: 'Formation control, waypoint following, and static and dynamic obstacle avoidance. The design scales independently of the number of UAVs.',
  },
  {
    title: 'Pure Pursuit & Stanley on a Real EV',
    sub: '1-ton electric vehicle · IIIT Hyderabad',
    tags: ['Control'],
    org: 'RRC, IIIT-H',
    art: 'pursuit',
    text: 'Pure Pursuit and Stanley controllers written and tuned in C++ on a 1-ton Mahindra electric vehicle, holding mean cross-track error to 0.15 m on real roads.',
  },
  {
    title: 'Pure Pursuit · CARLA',
    sub: 'Autonomous driving stack',
    tags: ['Control'],
    org: 'Personal',
    art: 'road',
    text: 'Geometric path tracking in the CARLA simulator. Steering is computed from a lookahead point, which keeps tracking smooth and stable through turns and dynamic scenarios.',
  },
  {
    title: 'Deep Q-Learning Bang-Bang Agent',
    sub: 'Training & generalization',
    tags: ['Learning', 'Control'],
    org: 'Addverb',
    art: 'dqn',
    text: 'A DQN policy that learns discrete obstacle-avoidance actions from laser scans, trained in ROS simulation and then tested for generalization in unseen environments.',
  },
];

export const publications = [
  {
    title: 'GPD: Guided Polynomial Diffusion for Motion Planning',
    authors: ['Parth Mahajan', 'Ajit Srikanth', 'Kallol Saha', 'Vishal Mandadi', 'Pranjal Paul', 'Pawan Wadhwani', 'Brojeshwar Bhowmick', 'Arun Singh', 'Madhava Krishna'],
    venue: 'IEEE 21st International Conference on Automation Science and Engineering (CASE)',
    year: 2025,
    url: 'https://doi.org/10.1109/CASE58245.2025.11163733',
    arxiv: 'https://arxiv.org/abs/2501.18229',
    equal: 4, // the first 4 authors are marked equal contribution (co-first authors) on the paper
  },
  {
    title: 'A Particle Swarm Optimization-Based Cooperation Method for Multiple-Target Search by Swarm UAVs in Unknown Environments',
    authors: ['Aniket Gupta', 'Aman Virmani', 'Parth Mahajan', 'Raghava Nallanthigal'],
    venue: '7th International Conference on Automation, Robotics and Applications (ICARA), IEEE',
    year: 2021,
    url: 'https://doi.org/10.1109/ICARA51699.2021.9376529',
    code: gh('MOPSO'),
    video: 'https://www.youtube.com/watch?v=dCsL4g-YQkY',
  },
  {
    title: 'Depth and Skeleton Based View-Invariant Human Action Recognition',
    authors: ['Parth Mahajan', 'Aniket Gupta'],
    venue: '2nd Global Conference for Advancement in Technology (GCAT), IEEE',
    year: 2021,
    url: 'https://doi.org/10.1109/GCAT52182.2021.9587638',
  },
];

export const blogs = [
  {
    part: 'LLMs on Robots',
    title: 'I Put JEV On A Robot To See If It Is More Than a Glorified Classifier',
    sub: 'Testing a structured-decision model as the mission supervisor for a Nav2 robot',
    url: 'https://medium.com/@parthmhajan/i-put-jev-on-a-robot-to-see-if-it-is-more-than-a-glorified-classifier-fc71a4a56e83',
  },
  {
    part: 'Numerical Methods',
    title: 'The Hidden Power of Padé Approximation',
    sub: 'Why a few rational coefficients can beat a high-order Taylor series',
    url: 'https://medium.com/@parthmhajan/the-hidden-power-of-pad%C3%A9-approximation-1ec2d7278def',
  },
  {
    part: 'Edge Deployment',
    title: 'Why Quantization Matters Now',
    sub: 'Running deep learning models efficiently on edge and embedded hardware',
    url: 'https://medium.com/@parthmhajan/why-quantization-matters-now-77e2660d7e95',
  },
  {
    part: 'Lie Theory · Part 2 / 3',
    title: 'A Tour to the City of Lie Theory for Robotics',
    sub: 'The main idea',
    url: 'https://medium.com/@parthmhajan/a-tour-to-the-city-of-lie-theory-for-robotics-part-2-3-main-idea-2aa3975caf8d',
  },
  {
    part: 'Lie Theory · Part 1 / 3',
    title: 'A Tour to the City of Lie Theory for Robotics',
    sub: 'Prerequisites and tools',
    url: 'https://medium.com/@parthmhajan/a-tour-to-the-city-of-lie-theory-for-robotics-part-1-3-prerequisites-6bcad7634643',
  },
];

export const certifications = [
  { title: 'Deep Learning Specialization (5 courses)', issuer: 'DeepLearning.AI · Coursera', date: 'Jul 2020', image: asset('certs/deeplearningai-deep-learning-specialization.webp'), verify: 'https://coursera.org/verify/specialization/98ZQLRFHKRDF' },
  { title: 'Natural Language Processing in TensorFlow', issuer: 'DeepLearning.AI · Coursera', date: 'Jul 2020', image: asset('certs/deeplearningai-nlp-tensorflow.webp'), verify: 'https://coursera.org/verify/QE35N4UGM85Z' },
  { title: 'Sequence Models', issuer: 'DeepLearning.AI · Coursera', date: 'Jul 2020', image: asset('certs/deeplearningai-sequence-models.webp'), verify: 'https://coursera.org/verify/4NLCAPGWYVMN' },
  { title: 'Convolutional Neural Networks in TensorFlow', issuer: 'DeepLearning.AI · Coursera', date: 'Jul 2020', image: asset('certs/deeplearningai-cnn-tensorflow.webp'), verify: 'https://coursera.org/verify/JTFEXHPS7MTU' },
  { title: 'Intro to TensorFlow for AI, ML & DL', issuer: 'DeepLearning.AI · Coursera', date: 'Jul 2020', image: asset('certs/deeplearningai-tensorflow.webp'), verify: 'https://coursera.org/verify/Y7K5KBA5JLGM' },
  { title: 'Combinatorics and Probability', issuer: 'UC San Diego & HSE · Coursera', date: 'May 2020', image: asset('certs/hse-combinatorics-probability.webp'), verify: 'https://coursera.org/verify/X9SGMCY4ESGE' },
  { title: 'Python Data Structures', issuer: 'University of Michigan · Coursera', date: 'May 2020', image: asset('certs/umich-python-data-structures.webp'), verify: 'https://coursera.org/verify/BJEKW5BLH788' },
  { title: 'Improving Deep Neural Networks', issuer: 'DeepLearning.AI · Coursera', date: 'Jun 2019', image: asset('certs/deeplearningai-improving-dnns.webp'), verify: 'https://coursera.org/verify/8UG6VYGZL7UT' },
  { title: 'Neural Networks and Deep Learning', issuer: 'DeepLearning.AI · Coursera', date: 'Mar 2019', image: asset('certs/deeplearningai-neural-networks-deep-learning.webp'), verify: 'https://coursera.org/verify/UHPZKDKCQ6SW' },
  { title: 'Machine Learning', issuer: 'Stanford Online · Coursera', date: 'Jan 2019', image: asset('certs/stanford-ml.webp'), verify: 'https://coursera.org/verify/JK77QVGSFK4J' },
];

export const avocations = [
  { title: 'Painting', text: 'Mostly acrylics, often of space. It’s how I slow down.', image: asset('img/painting.webp') },
  { title: 'Violin', text: 'Still a beginner, and still practicing my scales.', image: asset('img/violin.webp') },
  { title: 'The team', text: 'The UAS DTU team that built the swarm.', image: asset('img/uas-dtu-team.webp') },
  { title: 'Drone Olympics', text: 'We won, and this is the prize cheque.', image: asset('img/drone-olympics.webp') },
];

stats[0].value = blogs.length;
stats[1].value = projects.length;
stats[2].value = publications.length;
stats[4].value = certifications.length;
