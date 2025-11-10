import { Card, CardBody, CardHeader, Avatar, Chip } from '@heroui/react'
import { resumeData } from '@/config/resumeData'
import {
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const Resume = () => {
  // const { language } = useSystemConfigStore()

  return (
    <div className='col-span-12 bg-background 2xl:col-span-8'>
      <div className='flex flex-col w-full mx-auto p-4 lg:p-8 space-y-8'>
        {/* Header Section */}
        <Card className='w-full' shadow='sm'>
          <CardBody className='p-8 lg:p-12'>
            <div className='flex flex-col lg:flex-row items-center lg:items-start gap-8'>
              {/* Left: Avatar and Basic Info */}
              <div className='flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 flex-shrink-0'>
                <Avatar
                  src={resumeData.basicInfo.avatar}
                  name={resumeData.basicInfo.name}
                  className='w-32 h-32 lg:w-40 lg:h-40 border-2 border-primary/20'
                  showFallback
                />
                <div className='space-y-2'>
                  <h1 className='text-3xl lg:text-4xl font-bold text-foreground'>{resumeData.basicInfo.name}</h1>
                  <p className='text-lg lg:text-xl text-default-500 font-medium'>{resumeData.basicInfo.title}</p>
                </div>
              </div>

              {/* Right: Contact and Summary */}
              <div className='flex-1 space-y-6'>
                {resumeData.summarys &&
                  resumeData.summarys.map((summary: string, index: number) => (
                    <p key={index} className='text-default-600 leading-relaxed'>
                      {summary}
                    </p>
                  ))}

                {/* Contact Information */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <div className='flex items-center gap-3 text-default-600'>
                    <EnvelopeIcon className='w-5 h-5 text-primary flex-shrink-0' />
                    <span className='text-lg'>{resumeData.basicInfo.email}</span>
                  </div>

                  <div className='flex items-center gap-3 text-default-600'>
                    <MapPinIcon className='w-5 h-5 text-primary flex-shrink-0' />
                    <span className='text-lg'>{resumeData.basicInfo.location}</span>
                  </div>

                  <div className='flex items-center gap-3 text-default-600'>
                    <GlobeAltIcon className='w-5 h-5 text-primary flex-shrink-0' />
                    <a
                      href={resumeData.basicInfo.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-lg hover:text-primary transition-colors'
                    >
                      {resumeData.basicInfo.website}
                    </a>
                  </div>

                  <div className='flex items-center gap-3 text-default-600'>
                    <svg className='w-5 h-5 text-primary flex-shrink-0' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                    </svg>
                    <a
                      href={resumeData.basicInfo.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-lg hover:text-primary transition-colors'
                    >
                      {resumeData.basicInfo.github}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Main Content - Two Column Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Skills */}
            <Card className='w-full' shadow='sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <CodeBracketIcon className='w-5 h-5 text-primary' />
                  <h2 className='text-lg font-semibold'>Skills</h2>
                </div>
              </CardHeader>
              <CardBody className='pt-0 space-y-4'>
                <div>
                  <h3 className='text-sm font-medium mb-2 text-foreground'>Front-End</h3>
                  <div className='flex flex-wrap gap-1'>
                    {resumeData.skills.frontend.map((skill: string, index: number) => (
                      <Chip key={index} size='sm' variant='flat' color='primary'>
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='text-sm font-medium mb-2 text-foreground'>Back-End</h3>
                  <div className='flex flex-wrap gap-1'>
                    {resumeData.skills.backend.map((skill: string, index: number) => (
                      <Chip key={index} size='sm' variant='flat' color='secondary'>
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </div>
                {/* <div>
                  <h3 className='text-sm font-medium mb-2 text-foreground'>Operating Systems</h3>
                  <div className='flex flex-wrap gap-1'>
                    {resumeData.skills.systems.map((skill: string, index: number) => (
                      <Chip key={index} size='sm' variant='flat' color='success'>
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </div> */}

                <div>
                  <h3 className='text-sm font-medium mb-2 text-foreground'>Tools</h3>
                  <div className='flex flex-wrap gap-1'>
                    {resumeData.skills.tools.map((skill: string, index: number) => (
                      <Chip key={index} size='sm' variant='flat' color='danger'>
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='text-sm font-medium mb-2 text-foreground'>Other</h3>
                  <div className='flex flex-wrap gap-1'>
                    {resumeData.skills.other.map((other: string, index: number) => (
                      <Chip key={index} size='sm' variant='flat' color='secondary'>
                        {other}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='text-sm font-medium mb-2 text-foreground'>{'Soft Skills'}</h3>
                  <div className='flex flex-wrap gap-1'>
                    {resumeData.skills.soft.map((skill: string, index: number) => (
                      <Chip key={index} size='sm' variant='flat' color='warning'>
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Certifications */}
            {/* <Card className='w-full' shadow='sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <StarIcon className='w-5 h-5 text-primary' />
                  <h2 className='text-lg font-semibold'>Certifications</h2>
                </div>
              </CardHeader>
              <CardBody className='pt-0'>
                <div className='flex flex-wrap gap-2'>
                  {resumeData.certificates.map((cert, index) => (
                    <Chip key={index} size='sm' variant='flat' color='primary'>{cert}</Chip>
                  ))}
                </div>
              </CardBody>
            </Card> */}

            {/* Education */}
            <Card className='w-full' shadow='sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <AcademicCapIcon className='w-5 h-5 text-primary' />
                  <h2 className='text-lg font-semibold'>Education</h2>
                </div>
              </CardHeader>
              <CardBody className='pt-0 space-y-3'>
                <div>
                  <h3 className='font-semibold text-foreground'>{resumeData.education.degree}</h3>
                  <p className='text-default-500 text-sm'>{resumeData.education.school}</p>
                  <div className='flex items-center justify-between mt-2'>
                    <Chip size='sm' variant='flat' color='success'>
                      <span>{resumeData.education.period}</span>
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Highlights */}
            <Card className='w-full' shadow='sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <BriefcaseIcon className='w-5 h-5 text-primary' />
                  <h2 className='text-lg font-semibold'>Highlights</h2>
                </div>
              </CardHeader>
              <CardBody className='pt-0 space-y-6'>
                <div className='border-l-3 border-primary pl-4'>
                  <ul className='space-y-1'>
                    {resumeData.highlights.map((item, index) => (
                      <li key={index} className='text-default-600 text-sm flex items-start gap-2'>
                        <span className='text-primary mt-1 text-xs'>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardBody>
            </Card>

            {/* Work Experience */}
            <Card className='w-full' shadow='sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <BriefcaseIcon className='w-5 h-5 text-primary' />
                  <h2 className='text-lg font-semibold'>Work Experience</h2>
                </div>
              </CardHeader>
              <CardBody className='pt-0 space-y-6'>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className='border-l-3 border-primary pl-4'>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3'>
                      <div>
                        <h3 className='font-semibold text-foreground'>{exp.position}</h3>
                        <p className='text-default-500 text-sm'>{exp.company}</p>
                      </div>
                      <div className='flex items-center gap-2 text-sm text-default-400'>
                        <CalendarIcon className='w-4 h-4' />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <ul className='space-y-1'>
                      {exp.description.map((item, idx) => (
                        <li key={idx} className='text-default-600 text-sm flex items-start gap-2'>
                          <span className='text-primary mt-1 text-xs'>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardBody>
            </Card>

            {/* Projects */}
            <Card className='w-full' shadow='sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2'>
                  <GlobeAltIcon className='w-5 h-5 text-primary' />
                  <h2 className='text-lg font-semibold'>Projects</h2>
                </div>
              </CardHeader>
              <CardBody className='pt-0 space-y-6'>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className='flex flex-col border rounded-lg p-4 bg-default-50'>
                    <div className='flex flex-col gap-3 mb-3'>
                      <h3 className='font-semibold text-foreground'>{project.name}</h3>
                      <div className='flex flex-wrap gap-1'>
                        {project.tech.map((tech, idx) => (
                          <Chip key={idx} size='sm' variant='bordered'>
                            {tech}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <p className='text-default-600 text-sm mb-3 leading-relaxed'>{project.description}</p>
                    <div>
                      <h4 className='font-medium text-foreground text-sm mb-2'>Key Highlights:</h4>
                      <ul className='space-y-1'>
                        {project.highlights?.map((highlight, idx) => (
                          <li key={idx} className='text-default-600 text-sm flex items-center gap-2'>
                            <StarIcon className='w-3 h-3 text-warning' />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      {project.links && <h4 className='font-medium text-foreground text-sm mb-2'>Project link:</h4>}
                      <ul className='space-y-1'>
                        {project.links?.map((link, idx) => (
                          <li key={idx} className='text-default-600 text-sm flex items-center gap-2'>
                            {/* <StarIcon className='w-3 h-3 text-warning' /> */}
                            <a
                              href={link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-md hover:text-primary transition-colors'
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume
