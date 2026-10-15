import json
import os

# Đường dẫn tới thư mục dữ liệu gốc
DATA_DIR = "pc-part-dataset/data/json"

# Định nghĩa 60 linh kiện máy tính phổ biến nhất tại thị trường Việt Nam
# Cấu trúc đảm bảo tính tương thích thực tế giữa CPU, Mainboard, RAM, GPU, PSU, SSD, Case, Cooler
POPULAR_PARTS_CONFIG = [
    # ========================== 1. CPU (8 sản phẩm) ==========================
    {
        "category": "CPU",
        "search_file": "cpu.json",
        "search_name": "Intel Core i3-12100F",
        "name": "Intel Core i3-12100F (Up to 4.30GHz, 4 Nhân 8 Luồng)",
        "price": 1990000,
        "image_url": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "cores": 4,
            "threads": 8,
            "baseClock": "3.3 GHz",
            "boostClock": "4.3 GHz",
            "tdp": 58,
            "ramSupport": ["DDR4", "DDR5"],
            "hasIgpu": False
        }
    },
    {
        "category": "CPU",
        "search_file": "cpu.json",
        "search_name": "Intel Core i5-12400F",
        "name": "Intel Core i5-12400F (Up to 4.40GHz, 6 Nhân 12 Luồng)",
        "price": 2690000,
        "image_url": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "cores": 6,
            "threads": 12,
            "baseClock": "2.5 GHz",
            "boostClock": "4.4 GHz",
            "tdp": 65,
            "ramSupport": ["DDR4", "DDR5"],
            "hasIgpu": False
        }
    },
    {
        "category": "CPU",
        "search_file": "cpu.json",
        "search_name": "Intel Core i5-13400F",
        "name": "Intel Core i5-13400F (Up to 4.60GHz, 10 Nhân 16 Luồng)",
        "price": 4890000,
        "image_url": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "cores": 10,
            "threads": 16,
            "baseClock": "2.5 GHz",
            "boostClock": "4.6 GHz",
            "tdp": 65,
            "ramSupport": ["DDR4", "DDR5"],
            "hasIgpu": False
        }
    },
    {
        "category": "CPU",
        "search_file": "cpu.json",
        "search_name": "Intel Core i5-14400F",
        "name": "Intel Core i5-14400F (Up to 4.70GHz, 10 Nhân 16 Luồng)",
        "price": 5190000,
        "image_url": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "cores": 10,
            "threads": 16,
            "baseClock": "2.5 GHz",
            "boostClock": "4.7 GHz",
            "tdp": 65,
            "ramSupport": ["DDR4", "DDR5"],
            "hasIgpu": False
        }
    },
    {
        "category": "CPU",
        "search_file": "cpu.json",
        "search_name": "Intel Core i5-13600K",
        "name": "Intel Core i5-13600K (Up to 5.10GHz, 14 Nhân 20 Luồng)",
        "price": 6990000,
        "image_url": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "cores": 14,
            "threads": 20,
            "baseClock": "3.5 GHz",
            "boostClock": "5.1 GHz",
            "tdp": 125,
            "ramSupport": ["DDR4", "DDR5"],
            "hasIgpu": True
        }
    },
    {
        "category": "CPU",
        "search_file": "cpu.json",
        "search_name": "Intel Core i7-14700K",
        "name": "Intel Core i7-14700K (Up to 5.60GHz, 20 Nhân 28 Luồng)",
        "price": 10890000,
        "image_url": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "cores": 20,
            "threads": 28,
            "baseClock": "3.4 GHz",
            "boostClock": "5.6 GHz",
            "tdp": 125,
            "ramSupport": ["DDR4", "DDR5"],
            "hasIgpu": True
        }
    },
    {
        "category": "CPU",
        "search_file": "cpu.json",
        "search_name": "AMD Ryzen 5 5600",
        "name": "AMD Ryzen 5 5600 (Up to 4.40GHz, 6 Nhân 12 Luồng)",
        "price": 2790000,
        "image_url": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "AM4",
            "cores": 6,
            "threads": 12,
            "baseClock": "3.5 GHz",
            "boostClock": "4.4 GHz",
            "tdp": 65,
            "ramSupport": ["DDR4"],
            "hasIgpu": False
        }
    },
    {
        "category": "CPU",
        "search_file": "cpu.json",
        "search_name": "AMD Ryzen 7 7800X3D",
        "name": "AMD Ryzen 7 7800X3D (Up to 5.00GHz, 8 Nhân 16 Luồng, 3D V-Cache)",
        "price": 9990000,
        "image_url": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "AM5",
            "cores": 8,
            "threads": 16,
            "baseClock": "4.2 GHz",
            "boostClock": "5.0 GHz",
            "tdp": 120,
            "ramSupport": ["DDR5"],
            "hasIgpu": True
        }
    },

    # ========================== 2. MAINBOARD (8 sản phẩm) ==========================
    {
        "category": "Mainboard",
        "search_file": "motherboard.json",
        "search_name": "MSI PRO H610M-G DDR4",
        "name": "Mainboard MSI PRO H610M-G DDR4",
        "price": 1790000,
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "chipset": "H610",
            "formFactor": "Micro-ATX",
            "ramType": "DDR4",
            "ramSlots": 2,
            "maxRamGb": 64,
            "pcieGen": "PCIe 4.0",
            "m2Slots": 1,
            "hasWifi": False
        }
    },
    {
        "category": "Mainboard",
        "search_file": "motherboard.json",
        "search_name": "Gigabyte B760M GAMING PLUS WIFI DDR4",
        "name": "Mainboard Gigabyte B760M GAMING PLUS WIFI DDR4",
        "price": 3190000,
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "chipset": "B760",
            "formFactor": "Micro-ATX",
            "ramType": "DDR4",
            "ramSlots": 4,
            "maxRamGb": 128,
            "pcieGen": "PCIe 4.0",
            "m2Slots": 2,
            "hasWifi": True
        }
    },
    {
        "category": "Mainboard",
        "search_file": "motherboard.json",
        "search_name": "MSI B760 GAMING PLUS WIFI",
        "name": "Mainboard MSI B760 GAMING PLUS WIFI DDR5",
        "price": 3990000,
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "chipset": "B760",
            "formFactor": "ATX",
            "ramType": "DDR5",
            "ramSlots": 4,
            "maxRamGb": 192,
            "pcieGen": "PCIe 4.0",
            "m2Slots": 2,
            "hasWifi": True
        }
    },
    {
        "category": "Mainboard",
        "search_file": "motherboard.json",
        "search_name": "MSI MAG B760 TOMAHAWK WIFI",
        "name": "Mainboard MSI MAG B760 TOMAHAWK WIFI DDR5",
        "price": 5290000,
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "chipset": "B760",
            "formFactor": "ATX",
            "ramType": "DDR5",
            "ramSlots": 4,
            "maxRamGb": 192,
            "pcieGen": "PCIe 5.0",
            "m2Slots": 3,
            "hasWifi": True
        }
    },
    {
        "category": "Mainboard",
        "search_file": "motherboard.json",
        "search_name": "MSI PRO Z790-A MAX WIFI",
        "name": "Mainboard MSI PRO Z790-A MAX WIFI DDR5",
        "price": 6490000,
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "LGA1700",
            "chipset": "Z790",
            "formFactor": "ATX",
            "ramType": "DDR5",
            "ramSlots": 4,
            "maxRamGb": 192,
            "pcieGen": "PCIe 5.0",
            "m2Slots": 4,
            "hasWifi": True
        }
    },
    {
        "category": "Mainboard",
        "search_file": "motherboard.json",
        "search_name": "MSI B450M-A PRO MAX",
        "name": "Mainboard MSI B450M-A PRO MAX II",
        "price": 1390000,
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "AM4",
            "chipset": "B450",
            "formFactor": "Micro-ATX",
            "ramType": "DDR4",
            "ramSlots": 2,
            "maxRamGb": 64,
            "pcieGen": "PCIe 3.0",
            "m2Slots": 1,
            "hasWifi": False
        }
    },
    {
        "category": "Mainboard",
        "search_file": "motherboard.json",
        "search_name": "Asus PRIME B550M-A WIFI II",
        "name": "Mainboard Asus PRIME B550M-A WIFI II",
        "price": 2690000,
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "AM4",
            "chipset": "B550",
            "formFactor": "Micro-ATX",
            "ramType": "DDR4",
            "ramSlots": 4,
            "maxRamGb": 128,
            "pcieGen": "PCIe 4.0",
            "m2Slots": 2,
            "hasWifi": True
        }
    },
    {
        "category": "Mainboard",
        "search_file": "motherboard.json",
        "search_name": "MSI MAG B650 TOMAHAWK WIFI",
        "name": "Mainboard MSI MAG B650 TOMAHAWK WIFI DDR5",
        "price": 5490000,
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "socket": "AM5",
            "chipset": "B650",
            "formFactor": "ATX",
            "ramType": "DDR5",
            "ramSlots": 4,
            "maxRamGb": 192,
            "pcieGen": "PCIe 4.0",
            "m2Slots": 3,
            "hasWifi": True
        }
    },

    # ========================== 3. RAM (8 sản phẩm) ==========================
    {
        "category": "RAM",
        "search_file": "memory.json",
        "search_name": "Kingston FURY Beast 8 GB",
        "name": "RAM Kingston FURY Beast 8GB (1x8GB) DDR4 3200MHz",
        "price": 450000,
        "image_url": "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "ramType": "DDR4",
            "capacityGb": 8,
            "modules": "1x8GB",
            "busSpeed": 3200,
            "casLatency": 16,
            "voltage": "1.35V",
            "rgb": False
        }
    },
    {
        "category": "RAM",
        "search_file": "memory.json",
        "search_name": "Kingston FURY Beast 16 GB",
        "name": "RAM Kingston FURY Beast 16GB (2x8GB) DDR4 3200MHz",
        "price": 890000,
        "image_url": "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "ramType": "DDR4",
            "capacityGb": 16,
            "modules": "2x8GB",
            "busSpeed": 3200,
            "casLatency": 16,
            "voltage": "1.35V",
            "rgb": False
        }
    },
    {
        "category": "RAM",
        "search_file": "memory.json",
        "search_name": "Corsair Vengeance LPX 16 GB",
        "name": "RAM Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
        "price": 950000,
        "image_url": "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "ramType": "DDR4",
            "capacityGb": 16,
            "modules": "2x8GB",
            "busSpeed": 3200,
            "casLatency": 16,
            "voltage": "1.35V",
            "rgb": False
        }
    },
    {
        "category": "RAM",
        "search_file": "memory.json",
        "search_name": "G.Skill Ripjaws V 32 GB",
        "name": "RAM G.Skill Ripjaws V 32GB (2x16GB) DDR4 3200MHz",
        "price": 1690000,
        "image_url": "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "ramType": "DDR4",
            "capacityGb": 32,
            "modules": "2x16GB",
            "busSpeed": 3200,
            "casLatency": 16,
            "voltage": "1.35V",
            "rgb": False
        }
    },
    {
        "category": "RAM",
        "search_file": "memory.json",
        "search_name": "Kingston FURY Beast 16 GB",
        "name": "RAM Kingston FURY Beast 16GB (2x8GB) DDR5 5600MHz",
        "price": 1590000,
        "image_url": "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "ramType": "DDR5",
            "capacityGb": 16,
            "modules": "2x8GB",
            "busSpeed": 5600,
            "casLatency": 36,
            "voltage": "1.25V",
            "rgb": False
        }
    },
    {
        "category": "RAM",
        "search_file": "memory.json",
        "search_name": "Corsair Vengeance RGB 32 GB",
        "name": "RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz",
        "price": 2890000,
        "image_url": "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "ramType": "DDR5",
            "capacityGb": 32,
            "modules": "2x16GB",
            "busSpeed": 6000,
            "casLatency": 36,
            "voltage": "1.35V",
            "rgb": True
        }
    },
    {
        "category": "RAM",
        "search_file": "memory.json",
        "search_name": "G.Skill Trident Z5 Neo RGB 32 GB",
        "name": "RAM G.Skill Trident Z5 Neo RGB 32GB (2x16GB) DDR5 6000MHz",
        "price": 3290000,
        "image_url": "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "ramType": "DDR5",
            "capacityGb": 32,
            "modules": "2x16GB",
            "busSpeed": 6000,
            "casLatency": 30,
            "voltage": "1.35V",
            "rgb": True
        }
    },
    {
        "category": "RAM",
        "search_file": "memory.json",
        "search_name": "TEAMGROUP T-Force Delta RGB 32 GB",
        "name": "RAM TEAMGROUP T-Force Delta RGB 32GB (2x16GB) DDR5 6000MHz White",
        "price": 2790000,
        "image_url": "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "ramType": "DDR5",
            "capacityGb": 32,
            "modules": "2x16GB",
            "busSpeed": 6000,
            "casLatency": 38,
            "voltage": "1.35V",
            "rgb": True
        }
    },

    # ========================== 4. GPU (8 sản phẩm) ==========================
    {
        "category": "GPU",
        "search_file": "video-card.json",
        "search_name": "MSI GeForce RTX 3060 Ventus 2X 12G",
        "name": "VGA MSI GeForce RTX 3060 Ventus 2X 12G OC",
        "price": 6990000,
        "image_url": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "chipset": "GeForce RTX 3060",
            "vramGb": 12,
            "vramType": "GDDR6",
            "lengthMm": 235,
            "recommendedPsuWattage": 550,
            "powerPin": "1x 8-pin",
            "slots": 2
        }
    },
    {
        "category": "GPU",
        "search_file": "video-card.json",
        "search_name": "Asus DUAL EVO OC",
        "name": "VGA Asus Dual GeForce RTX 4060 EVO OC 8GB GDDR6",
        "price": 7990000,
        "image_url": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "chipset": "GeForce RTX 4060",
            "vramGb": 8,
            "vramType": "GDDR6",
            "lengthMm": 227,
            "recommendedPsuWattage": 550,
            "powerPin": "1x 8-pin",
            "slots": 2.5
        }
    },
    {
        "category": "GPU",
        "search_file": "video-card.json",
        "search_name": "Gigabyte GAMING OC",
        "name": "VGA Gigabyte GeForce RTX 4060 Ti GAMING OC 8GB",
        "price": 10490000,
        "image_url": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "chipset": "GeForce RTX 4060 Ti",
            "vramGb": 8,
            "vramType": "GDDR6",
            "lengthMm": 281,
            "recommendedPsuWattage": 550,
            "powerPin": "1x 8-pin",
            "slots": 2
        }
    },
    {
        "category": "GPU",
        "search_file": "video-card.json",
        "search_name": "MSI VENTUS 2X OC",
        "name": "VGA MSI GeForce RTX 4070 SUPER 12G VENTUS 2X OC",
        "price": 16990000,
        "image_url": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "chipset": "GeForce RTX 4070 SUPER",
            "vramGb": 12,
            "vramType": "GDDR6X",
            "lengthMm": 242,
            "recommendedPsuWattage": 650,
            "powerPin": "1x 16-pin (12VHPWR)",
            "slots": 2
        }
    },
    {
        "category": "GPU",
        "search_file": "video-card.json",
        "search_name": "Gigabyte WINDFORCE OC",
        "name": "VGA Gigabyte GeForce RTX 4070 SUPER WINDFORCE OC 12GB",
        "price": 17490000,
        "image_url": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "chipset": "GeForce RTX 4070 SUPER",
            "vramGb": 12,
            "vramType": "GDDR6X",
            "lengthMm": 261,
            "recommendedPsuWattage": 650,
            "powerPin": "1x 16-pin (12VHPWR)",
            "slots": 2.5
        }
    },
    {
        "category": "GPU",
        "search_file": "video-card.json",
        "search_name": "MSI RTX 4070 Ti SUPER 16G VENTUS 3X BLACK OC",
        "name": "VGA MSI GeForce RTX 4070 Ti SUPER 16G VENTUS 3X BLACK OC",
        "price": 22890000,
        "image_url": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "chipset": "GeForce RTX 4070 Ti SUPER",
            "vramGb": 16,
            "vramType": "GDDR6X",
            "lengthMm": 308,
            "recommendedPsuWattage": 750,
            "powerPin": "1x 16-pin (12VHPWR)",
            "slots": 3
        }
    },
    {
        "category": "GPU",
        "search_file": "video-card.json",
        "search_name": "Asus TUF GAMING OC",
        "name": "VGA Asus TUF Gaming GeForce RTX 4080 SUPER 16GB GDDR6X",
        "price": 28990000,
        "image_url": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "chipset": "GeForce RTX 4080 SUPER",
            "vramGb": 16,
            "vramType": "GDDR6X",
            "lengthMm": 348,
            "recommendedPsuWattage": 850,
            "powerPin": "1x 16-pin (12VHPWR)",
            "slots": 3.65
        }
    },
    {
        "category": "GPU",
        "search_file": "video-card.json",
        "search_name": "ASRock Challenger D",
        "name": "VGA ASRock Radeon RX 6600 Challenger D 8GB GDDR6",
        "price": 4990000,
        "image_url": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "chipset": "Radeon RX 6600",
            "vramGb": 8,
            "vramType": "GDDR6",
            "lengthMm": 269,
            "recommendedPsuWattage": 500,
            "powerPin": "1x 8-pin",
            "slots": 2
        }
    },

    # ========================== 5. PSU (7 sản phẩm) ==========================
    {
        "category": "PSU",
        "search_file": "power-supply.json",
        "search_name": "MSI MAG A650BN",
        "name": "Nguồn máy tính MSI MAG A650BN 650W 80 Plus Bronze",
        "price": 1290000,
        "image_url": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "wattage": 650,
            "efficiency": "80 Plus Bronze",
            "modularity": "Non-Modular",
            "formFactor": "ATX",
            "pcie5Support": False
        }
    },
    {
        "category": "PSU",
        "search_file": "power-supply.json",
        "search_name": "Corsair CX650M (2021)",
        "name": "Nguồn máy tính Corsair CX650M 650W 80 Plus Bronze Semi-Modular",
        "price": 1490000,
        "image_url": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "wattage": 650,
            "efficiency": "80 Plus Bronze",
            "modularity": "Semi-Modular",
            "formFactor": "ATX",
            "pcie5Support": False
        }
    },
    {
        "category": "PSU",
        "search_file": "power-supply.json",
        "search_name": "MSI MAG A750GL PCIE5",
        "name": "Nguồn máy tính MSI MAG A750GL PCIE5 750W 80 Plus Gold ATX 3.0",
        "price": 2390000,
        "image_url": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "wattage": 750,
            "efficiency": "80 Plus Gold",
            "modularity": "Fully Modular",
            "formFactor": "ATX",
            "pcie5Support": True
        }
    },
    {
        "category": "PSU",
        "search_file": "power-supply.json",
        "search_name": "Corsair RM750e (2025)",
        "name": "Nguồn máy tính Corsair RM750e 750W 80 Plus Gold ATX 3.0 Fully Modular",
        "price": 2690000,
        "image_url": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "wattage": 750,
            "efficiency": "80 Plus Gold",
            "modularity": "Fully Modular",
            "formFactor": "ATX",
            "pcie5Support": True
        }
    },
    {
        "category": "PSU",
        "search_file": "power-supply.json",
        "search_name": "MSI MAG A850GL PCIE5",
        "name": "Nguồn máy tính MSI MAG A850GL PCIE5 850W 80 Plus Gold ATX 3.0",
        "price": 2890000,
        "image_url": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "wattage": 850,
            "efficiency": "80 Plus Gold",
            "modularity": "Fully Modular",
            "formFactor": "ATX",
            "pcie5Support": True
        }
    },
    {
        "category": "PSU",
        "search_file": "power-supply.json",
        "search_name": "Corsair RM850e (2025)",
        "name": "Nguồn máy tính Corsair RM850e 850W 80 Plus Gold ATX 3.0 Fully Modular",
        "price": 3290000,
        "image_url": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "wattage": 850,
            "efficiency": "80 Plus Gold",
            "modularity": "Fully Modular",
            "formFactor": "ATX",
            "pcie5Support": True
        }
    },
    {
        "category": "PSU",
        "search_file": "power-supply.json",
        "search_name": "Corsair RM1000e (2023)",
        "name": "Nguồn máy tính Corsair RM1000e 1000W 80 Plus Gold ATX 3.0 Fully Modular",
        "price": 4190000,
        "image_url": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "wattage": 1000,
            "efficiency": "80 Plus Gold",
            "modularity": "Fully Modular",
            "formFactor": "ATX",
            "pcie5Support": True
        }
    },

    # ========================== 6. SSD (7 sản phẩm) ==========================
    {
        "category": "SSD",
        "search_file": "internal-hard-drive.json",
        "search_name": "Kingston NV2",
        "name": "Ổ cứng SSD Kingston NV2 500GB M.2 2280 NVMe PCIe 4.0",
        "price": 990000,
        "image_url": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "capacityGb": 500,
            "formFactor": "M.2 2280",
            "interface": "PCIe 4.0 x4 NVMe",
            "readSpeed": 3500,
            "writeSpeed": 2100,
            "dramCache": False
        }
    },
    {
        "category": "SSD",
        "search_file": "internal-hard-drive.json",
        "search_name": "Kingston NV2",
        "name": "Ổ cứng SSD Kingston NV2 1TB M.2 2280 NVMe PCIe 4.0",
        "price": 1490000,
        "image_url": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "capacityGb": 1000,
            "formFactor": "M.2 2280",
            "interface": "PCIe 4.0 x4 NVMe",
            "readSpeed": 3500,
            "writeSpeed": 2100,
            "dramCache": False
        }
    },
    {
        "category": "SSD",
        "search_file": "internal-hard-drive.json",
        "search_name": "Crucial P3 Plus",
        "name": "Ổ cứng SSD Crucial P3 Plus 1TB M.2 2280 PCIe 4.0 NVMe",
        "price": 1690000,
        "image_url": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "capacityGb": 1000,
            "formFactor": "M.2 2280",
            "interface": "PCIe 4.0 x4 NVMe",
            "readSpeed": 5000,
            "writeSpeed": 4200,
            "dramCache": False
        }
    },
    {
        "category": "SSD",
        "search_file": "internal-hard-drive.json",
        "search_name": "Western Digital Black SN770",
        "name": "Ổ cứng SSD WD Black SN770 1TB M.2 2280 PCIe 4.0 NVMe",
        "price": 1990000,
        "image_url": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "capacityGb": 1000,
            "formFactor": "M.2 2280",
            "interface": "PCIe 4.0 x4 NVMe",
            "readSpeed": 5150,
            "writeSpeed": 4900,
            "dramCache": False
        }
    },
    {
        "category": "SSD",
        "search_file": "internal-hard-drive.json",
        "search_name": "Samsung 980 Pro",
        "name": "Ổ cứng SSD Samsung 980 PRO 1TB M.2 2280 PCIe 4.0 NVMe",
        "price": 2390000,
        "image_url": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "capacityGb": 1000,
            "formFactor": "M.2 2280",
            "interface": "PCIe 4.0 x4 NVMe",
            "readSpeed": 7000,
            "writeSpeed": 5000,
            "dramCache": True
        }
    },
    {
        "category": "SSD",
        "search_file": "internal-hard-drive.json",
        "search_name": "Samsung 990 Pro",
        "name": "Ổ cứng SSD Samsung 990 PRO 1TB M.2 2280 PCIe 4.0 NVMe",
        "price": 2690000,
        "image_url": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "capacityGb": 1000,
            "formFactor": "M.2 2280",
            "interface": "PCIe 4.0 x4 NVMe",
            "readSpeed": 7450,
            "writeSpeed": 6900,
            "dramCache": True
        }
    },
    {
        "category": "SSD",
        "search_file": "internal-hard-drive.json",
        "search_name": "Samsung 990 Pro",
        "name": "Ổ cứng SSD Samsung 990 PRO 2TB M.2 2280 PCIe 4.0 NVMe",
        "price": 4590000,
        "image_url": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "capacityGb": 2000,
            "formFactor": "M.2 2280",
            "interface": "PCIe 4.0 x4 NVMe",
            "readSpeed": 7450,
            "writeSpeed": 6900,
            "dramCache": True
        }
    },

    # ========================== 7. CASE (7 sản phẩm) ==========================
    {
        "category": "Case",
        "search_file": "case.json",
        "search_name": "Montech AIR 100 ARGB",
        "name": "Vỏ Case Montech AIR 100 ARGB Black (Kèm 4 fan ARGB)",
        "price": 1150000,
        "image_url": "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "formFactor": "Micro-ATX Mid Tower",
            "supportedMotherboards": ["Micro-ATX", "Mini-ITX"],
            "maxGpuLengthMm": 330,
            "maxCpuCoolerHeightMm": 161,
            "radiatorSupportTop": "240mm",
            "sidePanel": "Kính cường lực",
            "includedFans": 4
        }
    },
    {
        "category": "Case",
        "search_file": "case.json",
        "search_name": "Montech AIR 903 MAX",
        "name": "Vỏ Case Montech AIR 903 MAX Black (Kèm 4 fan cao cấp)",
        "price": 1690000,
        "image_url": "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "formFactor": "ATX Mid Tower",
            "supportedMotherboards": ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
            "maxGpuLengthMm": 400,
            "maxCpuCoolerHeightMm": 180,
            "radiatorSupportTop": "360mm",
            "sidePanel": "Kính cường lực",
            "includedFans": 4
        }
    },
    {
        "category": "Case",
        "search_file": "case.json",
        "search_name": "Montech XR",
        "name": "Vỏ Case Montech XR Black (Bể cá kính cường lực góc cong)",
        "price": 1390000,
        "image_url": "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "formFactor": "ATX Mid Tower",
            "supportedMotherboards": ["ATX", "Micro-ATX", "Mini-ITX"],
            "maxGpuLengthMm": 420,
            "maxCpuCoolerHeightMm": 175,
            "radiatorSupportTop": "360mm",
            "sidePanel": "Kính cường lực Panoramic",
            "includedFans": 3
        }
    },
    {
        "category": "Case",
        "search_file": "case.json",
        "search_name": "Corsair 4000D Airflow",
        "name": "Vỏ Case Corsair 4000D Airflow Black",
        "price": 2190000,
        "image_url": "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "formFactor": "ATX Mid Tower",
            "supportedMotherboards": ["ATX", "Micro-ATX", "Mini-ITX"],
            "maxGpuLengthMm": 360,
            "maxCpuCoolerHeightMm": 170,
            "radiatorSupportTop": "280mm / 240mm",
            "sidePanel": "Kính cường lực",
            "includedFans": 2
        }
    },
    {
        "category": "Case",
        "search_file": "case.json",
        "search_name": "NZXT H5 Flow (2024)",
        "name": "Vỏ Case NZXT H5 Flow Black (2024 Edition)",
        "price": 2150000,
        "image_url": "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "formFactor": "ATX Mid Tower",
            "supportedMotherboards": ["ATX", "Micro-ATX", "Mini-ITX"],
            "maxGpuLengthMm": 365,
            "maxCpuCoolerHeightMm": 165,
            "radiatorSupportTop": "240mm",
            "sidePanel": "Kính cường lực",
            "includedFans": 2
        }
    },
    {
        "category": "Case",
        "search_file": "case.json",
        "search_name": "Lian Li LANCOOL 216 RGB",
        "name": "Vỏ Case Lian Li LANCOOL 216 RGB Black (Kèm 2 fan 160mm)",
        "price": 2490000,
        "image_url": "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "formFactor": "ATX Mid Tower",
            "supportedMotherboards": ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
            "maxGpuLengthMm": 392,
            "maxCpuCoolerHeightMm": 180,
            "radiatorSupportTop": "360mm",
            "sidePanel": "Kính cường lực",
            "includedFans": 3
        }
    },
    {
        "category": "Case",
        "search_file": "case.json",
        "search_name": "NZXT H9 Flow (2023)",
        "name": "Vỏ Case NZXT H9 Flow White Dual-Chamber",
        "price": 3990000,
        "image_url": "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "formFactor": "ATX Dual-Chamber Mid Tower",
            "supportedMotherboards": ["ATX", "Micro-ATX", "Mini-ITX"],
            "maxGpuLengthMm": 435,
            "maxCpuCoolerHeightMm": 165,
            "radiatorSupportTop": "360mm",
            "sidePanel": "Kính cường lực kép",
            "includedFans": 4
        }
    },

    # ========================== 8. COOLER (7 sản phẩm) ==========================
    {
        "category": "Cooler",
        "search_file": "cpu-cooler.json",
        "search_name": "Deepcool AK400",
        "name": "Tản nhiệt khí DeepCool AK400 4 ống đồng",
        "price": 650000,
        "image_url": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "coolerType": "Air Cooler",
            "heightMm": 155,
            "fanRpm": 1850,
            "noiseLevelDb": 29.0,
            "maxTdpSupport": 220,
            "supportedSockets": ["LGA1700", "AM4", "AM5", "LGA1200"]
        }
    },
    {
        "category": "Cooler",
        "search_file": "cpu-cooler.json",
        "search_name": "Thermalright Peerless Assassin 120 SE",
        "name": "Tản nhiệt khí Thermalright Peerless Assassin 120 SE",
        "price": 790000,
        "image_url": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "coolerType": "Air Cooler (Tháp đôi)",
            "heightMm": 155,
            "fanRpm": 1550,
            "noiseLevelDb": 25.6,
            "maxTdpSupport": 245,
            "supportedSockets": ["LGA1700", "AM4", "AM5", "LGA1200"]
        }
    },
    {
        "category": "Cooler",
        "search_file": "cpu-cooler.json",
        "search_name": "Thermalright Phantom Spirit 120 SE ARGB",
        "name": "Tản nhiệt khí Thermalright Phantom Spirit 120 SE ARGB",
        "price": 950000,
        "image_url": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "coolerType": "Air Cooler (Tháp đôi 7 ống)",
            "heightMm": 154,
            "fanRpm": 1500,
            "noiseLevelDb": 25.6,
            "maxTdpSupport": 280,
            "supportedSockets": ["LGA1700", "AM4", "AM5", "LGA1200"]
        }
    },
    {
        "category": "Cooler",
        "search_file": "cpu-cooler.json",
        "search_name": "Deepcool AK620 ZERO DARK",
        "name": "Tản nhiệt khí DeepCool AK620 ZERO DARK (All Black)",
        "price": 1450000,
        "image_url": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "coolerType": "Air Cooler (Tháp đôi 6 ống)",
            "heightMm": 160,
            "fanRpm": 1850,
            "noiseLevelDb": 28.0,
            "maxTdpSupport": 260,
            "supportedSockets": ["LGA1700", "AM4", "AM5", "LGA1200"]
        }
    },
    {
        "category": "Cooler",
        "search_file": "cpu-cooler.json",
        "search_name": "Thermalright Aqua Elite V3",
        "name": "Tản nhiệt nước AIO Thermalright Aqua Elite 360 V3 ARGB",
        "price": 1390000,
        "image_url": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "coolerType": "AIO Liquid Cooler 360mm",
            "radiatorSizeMm": 360,
            "fanRpm": 1500,
            "noiseLevelDb": 25.6,
            "maxTdpSupport": 300,
            "supportedSockets": ["LGA1700", "AM4", "AM5", "LGA1200"]
        }
    },
    {
        "category": "Cooler",
        "search_file": "cpu-cooler.json",
        "search_name": "Deepcool LT720",
        "name": "Tản nhiệt nước AIO DeepCool LT720 RGB 360mm",
        "price": 2990000,
        "image_url": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "coolerType": "AIO Liquid Cooler 360mm",
            "radiatorSizeMm": 360,
            "fanRpm": 2250,
            "noiseLevelDb": 32.9,
            "maxTdpSupport": 300,
            "supportedSockets": ["LGA1700", "AM4", "AM5", "LGA1200"]
        }
    },
    {
        "category": "Cooler",
        "search_file": "cpu-cooler.json",
        "search_name": "NZXT Kraken 360",
        "name": "Tản nhiệt nước AIO NZXT Kraken 360 (Màn hình LCD)",
        "price": 4290000,
        "image_url": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=600&q=80",
        "specs": {
            "coolerType": "AIO Liquid Cooler 360mm",
            "radiatorSizeMm": 360,
            "fanRpm": 1800,
            "noiseLevelDb": 30.6,
            "maxTdpSupport": 320,
            "supportedSockets": ["LGA1700", "AM4", "AM5", "LGA1200"]
        }
    }
]

def main():
    print(f"Bắt đầu xử lý {len(POPULAR_PARTS_CONFIG)} linh kiện...")

    # Load cache cho các file json
    file_cache = {}
    
    result = []
    category_counts = {}

    for idx, item in enumerate(POPULAR_PARTS_CONFIG, start=1):
        cat = item["category"]
        category_counts[cat] = category_counts.get(cat, 0) + 1

        # Trích xuất dữ liệu gốc nếu cần kiểm chứng
        filename = item["search_file"]
        if filename not in file_cache:
            file_path = os.path.join(DATA_DIR, filename)
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as f:
                    file_cache[filename] = json.load(f)
            else:
                file_cache[filename] = []

        # Tạo đối tượng sản phẩm chuẩn hóa cho PostgreSQL
        product = {
            "id": idx,
            "category": cat,
            "name": item["name"],
            "price": item["price"],
            "image_url": item["image_url"],
            "specs": item["specs"]
        }
        result.append(product)

    print("\n--- THỐNG KÊ DANH MỤC ---")
    total = 0
    for cat, count in category_counts.items():
        print(f" • {cat}: {count} sản phẩm")
        total += count
    print(f"Tổng cộng: {total} sản phẩm")

    # Lưu ra file JSON mới
    out_path_1 = "pc-part-dataset/smartbuild_components_60.json"
    with open(out_path_1, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"\n[OK] Đã xuất file thành công: {out_path_1}")

    # Copy ra thư mục public/ để frontend cũng có thể fetch trực tiếp nếu muốn
    out_path_2 = "public/smartbuild_components_60.json"
    with open(out_path_2, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"[OK] Đã xuất bản sao tại: {out_path_2}")

if __name__ == "__main__":
    main()
