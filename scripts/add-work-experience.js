#!/usr/bin/env node

/**
 * Utility script to add work experience entries with automatic logo generation
 * Usage: node scripts/add-work-experience.js
 */

const fs = require('fs')
const path = require('path')

function generateCompanyLogo(companyName) {
    // Clean the company name and get initials
    const cleanName = companyName.replace(/[^a-zA-Z0-9\s]/g, '').trim()
    const words = cleanName.split(' ').filter(word => word.length > 0)

    let initials = ''
    if (words.length >= 2) {
        initials = words.slice(0, 2).map(word => word[0]).join('').toUpperCase()
    } else if (words.length === 1) {
        initials = words[0].slice(0, 2).toUpperCase()
    } else {
        initials = 'CO'
    }

    // Use lighter zinc gray background with white text for a more subtle appearance
    const backgroundColor = 'a1a1aa' // Zinc-400 - lighter and less prominent
    const textColor = 'ffffff' // White

    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=${backgroundColor}&textColor=${textColor}&size=64&fontSize=24&fontWeight=600`
}

function addWorkExperience() {
    const readline = require('readline')
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    console.log('📝 Add Work Experience Entry')
    console.log('============================\n')

    const questions = [
        'Company name: ',
        'Job title: ',
        'Start date (e.g., 2023): ',
        'End date (e.g., Aktuell): ',
        'Company website (optional): ',
        'Custom logo URL (optional, press Enter to auto-generate): '
    ]

    const answers = []

    function askQuestion(index) {
        if (index >= questions.length) {
            rl.close()
            processAnswers(answers)
            return
        }

        rl.question(questions[index], (answer) => {
            answers.push(answer.trim())
            askQuestion(index + 1)
        })
    }

    askQuestion(0)
}

function processAnswers(answers) {
    const [company, title, start, end, website, customLogo] = answers

    const workEntry = {
        company,
        title,
        start,
        end,
        link: website || '#',
        id: `work-${Date.now()}`,
        ...(customLogo && { logo: customLogo })
    }

    console.log('\n📋 Generated Work Experience Entry:')
    console.log('====================================')
    console.log(JSON.stringify(workEntry, null, 2))

    if (!customLogo) {
        const generatedLogo = generateCompanyLogo(company)
        console.log(`\n🎨 Generated Logo URL: ${generatedLogo}`)
    }

    console.log('\n💡 To add this to your site:')
    console.log('1. Open app/data.ts')
    console.log('2. Add this entry to the WORK_EXPERIENCE array')
    console.log('3. The logo will be automatically generated if no custom logo is provided')
}

if (require.main === module) {
    addWorkExperience()
}

module.exports = { generateCompanyLogo, addWorkExperience }
