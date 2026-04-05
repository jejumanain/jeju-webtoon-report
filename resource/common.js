

        // 1. Mobile Menu Toggle
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            btn.textContent = menu.classList.contains('hidden') ? '☰' : '✕';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                btn.textContent = '☰';
            });
        });

        // 2. Scroll Fade-up Animation (Intersection Observer)
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 한 번 나타난 후 감시를 중단하고 싶다면 아래 주석 제거
                    //observer.unobserve(entry.target); // Trigger once
                } else {
                    // 화면에서 나갔을 때 다시 숨기고 싶다면 아래 주석 제거
                    // entry.target.classList.remove('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(element => {
            observer.observe(element);
        });

        

        // 3. Chart.js Initialization
        document.addEventListener('DOMContentLoaded', function() {
            // Chart 1: Bar Chart (Problem)
            const ctxDisparity = document.getElementById('disparityChart').getContext('2d');
            new Chart(ctxDisparity, {
                type: 'bar',
                data: {
                    labels: ['예산 지원 규모', '전문 교육 인프라', '대형 플랫폼 연재율', '자생적 커뮤니티 활성도'],
                    datasets: [
                        {
                            label: '수도권 (거대한 댐)',
                            data: [90, 85, 95, 40],
                            backgroundColor: '#222222',
                            borderRadius: 4
                        },
                        {
                            label: '제주 (현재)',
                            data: [10, 15, 5, 20],
                            backgroundColor: '#005BAC',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // CRITICAL: Allows CSS to control height
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: { enabled: true }
                    },
                    scales: {
                        y: { beginAtZero: true, max: 100 }
                    }
                }
            });

            // Chart 2: Doughnut Chart (Solution)
            const ctxEcosystem = document.getElementById('ecosystemChart').getContext('2d');
            new Chart(ctxEcosystem, {
                type: 'doughnut',
                data: {
                    labels: ['아동/청소년 (미래 인재)', '독립 창작자/동호인', '프로 작가 (멘토)', '이주민/중장년층'],
                    datasets: [{
                        data: [35, 30, 15, 20],
                        backgroundColor: [
                            '#005BAC', // jejuBlue
                            '#4A90E2', // light blue
                            '#FF7F00', // jejuOrange
                            '#F5A623'  // light orange
                        ],
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // CRITICAL for layout control
                    plugins: {
                        legend: { position: 'right' }
                    },
                    cutout: '60%'
                }
            });
            
            // Initial load of mock data
            setTimeout(fetchMockData, 1000);
        });

        // 4. Google Apps Script Data Binding (Mock & Implementation Guide)
        // 실제 배포 시에는 아래 URL을 본인의 GAS 배포 웹앱 URL로 변경해야 합니다.
        const GAS_API_URL = "https://script.google.com/macros/s/AKfycbzsMs_kCz85OPw6DsYjZ9s6Gqlo88RiXDflZpxMY5J5BWM3rQi_qTbiYmbd4YDAnFYPsg/exec"

        function fetchMockData() {
            const container = document.getElementById('gas-data-container');
            container.innerHTML = '<div class="text-center text-gray-400 py-4">데이터를 불러오는 중...</div>';


            fetch(GAS_API_URL)
                .then(response => response.json())
                .then(data => {
                    renderData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    container.innerHTML = '<div class="text-red-400">데이터를 불러오는데 실패했습니다.</div>';
                });


            // 시뮬레이션을 위한 Mock Data 생성 (구글 시트에서 넘어오는 JSON 구조 가정)
            /*
            setTimeout(() => {
                const mockData = [
                    { name: "김*희", role: "청소년 작가", message: "학교 밖에서도 웹툰을 배울 수 있는 기초반이 생겼으면 좋겠습니다!" },
                    { name: "박*아", role: "웹툰 강사", message: "제주 신화를 소재로 한 단편 프로젝트 팀원을 모집합니다." },
                    { name: "이*지", role: "독립 출판인", message: "다음 달 지역 서점에서 소규모 굿즈 & 진(Zine) 마켓을 기획 중입니다." },
                    { name: "소*수정", role: "프로 작가", message: "지역 작가들이 연대하여 만드는 오프라인 크로키 모임 환영합니다." }
                ];
                renderData(mockData);
            }, 800);
            */
        }

        function renderData(dataArray) {
            const container = document.getElementById('gas-data-container');
            container.innerHTML = '';
            
            dataArray.forEach(item => {
                const div = document.createElement('div');
                div.className = 'bg-gray-700 p-3 rounded text-sm text-gray-200 border-l-4 border-jejuBlue';
                div.innerHTML = `
                    <strong class="text-white">${item.category}</strong> <span class="text-xs text-jejuOrange ml-1">[${item.role}]</span>
                    <p class="mt-1">${item.message}</p>
                `;
                container.appendChild(div);
            });
        }