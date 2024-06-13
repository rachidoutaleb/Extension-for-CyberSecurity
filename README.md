# Extension-for-CyberSecurity
I've developed 3 cybersecurity extensions:
- **All Safe:** This extension defends against phishing emails, spam, and malicious executable files and PDFs.
- **Guide Hardening:** It provides practical recommendations to enhance the security of your computer system.
- **Scan to Exploit:** This tool analyzes security scan results (nmap, Nikto, sqlmap...), identifies vulnerabilities (CVEs), provides direct links to well-known websites like Exploit-DB for each CVE, and suggests secure exploitation methods.

## How I Made These Extensions:
- **All Safe:** Utilizes four models, each dedicated to a specific functionality (detecting spam, phishing, malicious executables, and malicious PDFs).

- **Guide Hardening:** Uses the PKL model to transform more than 120 hardening recommendation PDFs into a reduced model, then connects it to Pinecone to convert them into vectors. Uses Flask to connect the frontend HTML with the backend Python. Connects these vectors with the ChatGPT API to understand user questions and search through Pinecone vectors to display responses based on these hardening recommendation PDFs.

  List of hardening recommendations used in this extension:
  - **Windows:** Windows 10, 11, 7, 8.1, Server 2008 R2, Server 2022, XP
  - **Linux:** CentOS, Debian, Oracle Linux, Red Hat, Ubuntu
  - **Apple:** iOS, iPadOS, macOS
  - **Cloud:** Oracle Cloud, Alibaba Cloud, AWS, IBM Cloud
  - **Firewall:** Check Point, Cisco, Fortigate, SOPHOS
  - **Databases:** Oracle, MySQL, SQL Server, YugabyteDB, Snowflake
  - **Containers:** Docker, Kubernetes, GitLab, GKE, OpenShift
  - **Virtualization:** VMware ESXi
  - **Software:** Microsoft Office (Office 2013, 2016, Enterprise)

- **Scan-to-Exploit:** Uses a prompt that combines a script to pass ChatGPT responses through without filtering, and another prompt that provides responses tailored to my specifications.

# All Safe
![icon12](https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/7c7cd871-e5e5-4773-b262-8217147c200b)

## Functionalities grouped under All Safe:
Phishing emails<br/>
Spam emails<br/>
Malicious executable files<br/>
Malicious PDFs<br/>

## How to Use All Safe :
Open 'allsafe.pdf' in the 'user guide' directory for installation and usage instructions.

## implementation :
https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/fe74af96-aa9e-4f99-81f9-b189ab65fc46

# Guide hardning
![1](https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/43e9324c-00a8-4426-b4dc-24fa5262b38c)



## How to Use Guide Hardening :
Open 'Guide Hardening.pdf' in the 'user guide' directory for installation and usage instructions.

## implementation :
https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/8ea91fd4-3362-45e3-80b5-fa24ec5e7939

# Scan-to-exploit
![image_128x128](https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/99ae6566-4945-4593-8acc-dc62ac37bbbd)


## How to Use scan-to-exploit :
Open 'scan-to-exploit.txt' in the 'user guide' directory for installation and usage instructions.
    
## implementation :
https://github.com/rachidoutaleb/Extension-for-CyberSecurity/assets/123762098/3d5436ca-2e40-4952-824f-895eed36e61f

















