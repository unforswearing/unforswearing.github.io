\#\# What is a Service Level Objective

A Service Level Objective, or SLO, is a metric used by organizations to measure the reliability of a service. The service level objectives establish a base level of reliability for a service. Each individual objective can be seen as a reliability guarantee for users and and should support the needs of both users and your organization. 

The SLO does not exist on its own. Individual Service Level Objectives must be based on a performance metric or indicator that can be tracked over time to ensure compliance. This indicator is often a short formula to illustrate the intended performance of your service. This formula is called the Service Level Indicator (SLI).


Additionally, the Service Level Objective may be included as a part of a Service Level Agreement, or SLA. The SLA defines the level of quality provided by the service to end users, how this quality will be measured, and how users will be compensated if the metric is not met. SLO's and SLI's will often be a part of this Service Level Agreement.

| Term                              | Definition                                                                                                  |

|-----------------------------------|-------------------------------------------------------------------------------------------------------------|

| \*\*Service Level Objective (SLO)\*\* | The individual objectives the organization agrees to provide to the end user over a specific period of time.  |

| \*\*Service Level Indicator (SLI)\*\* | The actual total the service provides to an end user for each objective in the SLA . The SLI is often used as a way to create SLO's.                         |

| \*\*Service Level Agreement (SLA)\*\* | An agreement made by an organization and end user for the service provided by the organization. The SLA will sometimes contain specific SLO's, but can exist as a standalone document.              |

\#\# What is a Good Service Level Objective

A good Service Level Objectives meet your user needs based on their expectations of the service you provide. But don't forget that your objectives must also support your business goals, so it is important that your organization is aligned on these objectives at all levels.

\*\*What do users expect from your service?\*\* The SLO's you create for your services should be well within a range expected by your customers but also allow your service the opportunity to tolerate some fluctuation in quality. 

\*\*Are there any issues that affect your users?\*\* Keep in mind any issues your users have encountered (or may encounter in the future) that would be disruptive to their experience with your service. Any issue that might degrade the quality of your service for end users can benefit from a service level objective. An SLO for these areas of your service creates a reliability guarantee, a promise to your users that this service will be functional in most situations. 

\*\*How can you create measurable SLO's?\*\* SLO's should be based on the minimum level of quality you would like to provide your users and ensure that your service meets this minimum on a regular basis. Limiting the scope of SLO's will make it easier to monitor and measure performance over a specific period of time. 

\*\*How do you measure the performance of SLO's?\*\* The specific measurement for each objective should be discussed with all relevant internal teams, from development to operations. This measurement will often appear as a formula that sets a baseline for performance of a particular aspect of your service. Measuring the performance of your objectives can be done with internal tooling, or with external performance monitoring tools like \[Stackify\](https://stackify.com) and \[Netreo\](https://www.netreo.com/).

\#\# How do Service Level Objectives Work

Service Level Objectives work by defining the guarantees and limitations of the service they provide. When entering into a new contract for a service both the user and provider must agree that the service will operate within the limitations specified by the individual Service Level Objectives.

Compliance with these objectives are measured using the Service Level Indicator that is established alongside the SLO. The metric you choose to measure your service against should never be an arbitrary figure, such as "100% uptime". Instead, this goal should be realistic and relate directly to how often your service is actually available for users. For example, it might make sense for your objective to promise 99.95% uptime.

SLO's work best when they are realistic to your users and business needs. With that in mind, it is important to regularly review your metrics for success or failure, and adjust the objectives when you find they are no longer providing value. Perhaps your service regularly exceeds a downtime objective, or user requests routinely take longer to process than stated in the objective. Take the time to review why these issues may be happening and adjust your related SLO's accordingly. 

\#\# How to Define Service Level Objectives

To define a Service Level Objective you must be aware of how users interact with your service, and break each aspect of your service into clear and measurable elements. Remember, at their core the individual service level objectives you offer are directly related to the reliability of your service. As such, these objectives are connected to your users satisfaction with your service \-- an unreliable service will quickly be abandoned by users if they can not trust that it will operate as intended.

Service Level Objectives should contain the metric being monitored for your objective, the objective itself, the period of time during which you will measure your objective, and how frequently you will review the measurements to ensure your service complies to the SLO. 

|Metric|Objective|Measurement Period|Review Period|

|-|-|-|-|

|The general category for your objective, like Availability, or Support|This is the specific objective being measured.|The measurement period states the amount of time the objective will be measured.|Specifies how long the metric must be maintained.|

\#\#\# Examples of Service Level Objectives

For example, say you have a CRM and you want to ensure that your system is available consistently throughout the year. To do this you can set a very high limit for downtime of your service and the SLO for this item may include an uptime guarantee stating your site will be available at least 99.95% of the year. A draft of this SLO could be something like the table below:

|Metric|Objective|Measurement Period|Review Period|

|-|-|-|-|

|Availability|All site functions available \>= 99.95%|One Year|Quarterly|

Another example is you might also want to ensure your users are aware of any planned downtime for your service. You can create an SLO for this objective based on the amount of time you plan to have your site offline throughout the year, with a small buffer to ensure that you have time to recover from any errors that might arise during the downtime. The SLO for planned site outages could be similar to the table below:

|Metric|Objective|Measurement Period|Review Period|

|-|-|-|-|

|Availability|Planned outage duration \< 1 hour|One Year|Quarterly|

Using the process of identifying a user need and creating an SLO based on that need can be performed for any aspect of your service that can affect your customers experience. Be sure the SLO you create is clear and can be measured for compliance within a specified review period, and you have a plan to compensate your users if the performance of your service is lower than stated in your SLO. 

\#\# Conclusion

In this article you learned about Service Level Objectives (SLO), what you should look for in a good SLO. Additionally you learned how service levels work, acting as a reliability guarantee that your site will consistently meet users needs. Finally, you learned how to define an SLO, taking user interaction and reliability into account. 

\[Stackify\](https://stackify.com), a \[Netreo\](https://www.netreo.com/) company, is a performance monitoring tool for the full lifecycle of your application. Stackify allows you to get key insights into your service for code profiling, error tracking, and transaction tracing, allowing your team to make your application reliable and error free. Stackify \[works with your stack\](https://stackify.com/technologies/) and can provide the tools you need for monitoring your Service Level Objectives. Start a \[free trial\](https://stackify.com/free-trial/) with Stackify today. 

